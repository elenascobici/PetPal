import React, { useState } from 'react'; 
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import FileInput from './FileInput';
import DateInput from './DateInput';
import './style.css';
import SelectInput, { sizeOptions, genderOptions, behaviourOptions, typeOfPetOptions, statusOptions } from './SelectInput';

const AdoptionForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shelterId = localStorage.getItem('id'); 
    const authToken = localStorage.getItem('access_token'); 
    const url = `http://localhost:8000/pet/shelter/${shelterId}/pet/`;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        formDataToSend.append('pet_image_1', formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Creation data:', data);
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

   
   return (
    <div className="page-container">
      <div className="main-pet-adoption manrope">
        <div className="container mt-5">
          <h2 className="text-center mb-4 mt-4 title">Create Pet Listing</h2>
          <form onSubmit={handleSubmit}>
            <TextInput id="name" value={formData.name} onChange={handleChange} label="Pet Name" />
            <TextAreaInput id="description" value={formData.description} onChange={handleChange} label="Description" rows="3" />
            <TextAreaInput id="medicalHistory" value={formData.medicalHistory} onChange={handleChange} label="Medical History" rows="3" />
            <TextInput id="location" value={formData.location} onChange={handleChange} label="Location" placeholder="PAW Station, ON" />
            <TextInput id="age" value={formData.age} onChange={handleChange} label="Age" />
            <TextInput id="colour" value={formData.colour} onChange={handleChange} label="Colour" />
            <SelectInput id="size" value={formData.size} onChange={handleChange} label="Size" options={sizeOptions} />
            <SelectInput id="gender" value={formData.gender} onChange={handleChange} label="Gender" options={genderOptions} />
            <SelectInput id="behaviour" value={formData.behaviour} onChange={handleChange} label="Behaviour" options={behaviourOptions} />
            <SelectInput id="typeOfPet" value={formData.type} onChange={handleChange} label="Type" options={typeOfPetOptions} />
            <SelectInput id="status" value={formData.status} onChange={handleChange} label="Status" options={statusOptions} />
            <DateInput id="deadline" value={formData.deadline} onChange={handleChange} label="Deadline" min="2021-09-01" max="2024-12-31" /> 
            <FileInput id="image" onChange={handleFileChange} label="Image"/>
            <div className="row mb-3 mt-4">
              <div className="col-12">
                <button className="yellowButton" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
   

export default AdoptionForm;

