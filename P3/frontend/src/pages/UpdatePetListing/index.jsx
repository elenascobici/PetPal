import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import FileInput from './FileInput';
import DateInput from './DateInput';
import './style.css';
import SelectInput, { sizeOptions, genderOptions, behaviourOptions, typeOfPetOptions, statusOptions } from './SelectInput';

const EditPetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    age: '',
    size: '',
    gender: '',
    behaviour: '',
    typeOfPet: '',
    colour: '',
    medicalHistory: '',
    deadline: '',
    status: '',
    image: null,
  }); 
  const { petId } = useParams();
  console.log(petId);
  const navigate = useNavigate();

  const shelterId = localStorage.getItem('id');
  
  useEffect(() => {
    const fetchPetData = async () => {
      const authToken = localStorage.getItem('access_token');
      const url = `http://localhost:8000/pet/${petId}/?search=`; 
  
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched pet data:", data);
        setFormData(data[0]); 
      })
      .catch(error => {
        console.error('Error fetching pet data:', error);
      });
    };
  
    if (petId) {
      fetchPetData();
    }
  }, [petId]);
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  
  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleCancel = () => {
    navigate(-1); 
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('access_token');

    const { name, gender, type, ...dataToSend } = formData;

    const formDataObj = new FormData();
    for (const key in dataToSend) {
      if (dataToSend[key] != null) { 
        formDataObj.append(key, dataToSend[key]);
      }
    }

    if (formData.image) {
      formDataObj.append('pet_image_1', formData.image);
    }


    const url = `http://localhost:8000/pet/shelter/${shelterId}/pet/${petId}/`; 

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formDataObj,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Update data:', data);
      navigate('/shelter/search/'); 

    } catch (error) {
      console.error('Error updating shelter:', error);
    }
  };


  // ... Your form JSX goes here, similar to AdoptionForm ...
  return (
    <div className="page-container">
      <div className="main-pet-adoption manrope">
        <div className="container mt-5">
          <h2 className="text-center mb-4 mt-4 title">Edit Pet Listing</h2>
          <form onSubmit={handleSubmit}>
            <div className="alert alert-info" role="alert">
                Please fill out at least one field to update.
            </div>
            <TextInput id="name" value={formData.name} label="Pet Name" readOnly/>
            <TextAreaInput id="description" value={formData.description} onChange={handleChange} label="Description" rows="3" />
            <TextAreaInput id="medicalHistory" value={formData.medicalHistory} onChange={handleChange} label="Medical History" rows="3" />
            <TextInput id="location" value={formData.location} onChange={handleChange} label="Location" placeholder="PAW Station, ON" />
            <TextInput id="age" value={formData.age} onChange={handleChange} label="Age" />
            <TextInput id="colour" value={formData.colour} onChange={handleChange} label="Colour" />
            <SelectInput id="size" value={formData.size} onChange={handleChange} label="Size" options={sizeOptions} />
            <SelectInput id="gender" value={formData.gender} label="Gender" options={genderOptions} readOnly/>
            <SelectInput id="behaviour" value={formData.behaviour} onChange={handleChange} label="Behaviour" options={behaviourOptions} />
            <SelectInput id="typeOfPet" value={formData.type}  label="Type" options={typeOfPetOptions} readOnly/>
            <SelectInput id="status" value={formData.status} onChange={handleChange} label="Status" options={statusOptions} />
            <DateInput id="deadline" value={formData.deadline} onChange={handleChange} label="Deadline" min="2021-09-01" max="2024-12-31" /> 
            <FileInput id="image" onChange={handleFileChange} label="Image"/>
            <div className="row mb-3 mt-4">
              <div className="col-12">
                <button className="yellowButton" type="button" onClick={handleCancel}>Cancel</button>
                <button className="yellowButton" type="submit" >Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
   


export default EditPetForm;
