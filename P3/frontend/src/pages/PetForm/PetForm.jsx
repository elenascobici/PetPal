import React, { useState, navigate } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import FileInput from './FileInput';
import DateInput from './DateInput';
import './style.css';
import SelectInput, { sizeOptions, genderOptions, behaviourOptions, typeOfPetOptions, statusOptions } from './SelectInput';

const AdoptionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
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

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [id]: ''
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Required';
        if (!formData.location) errors.location = 'Required';
        if (!formData.age) errors.age = 'Required';
        if (!formData.size) errors.size = 'Required';
        if (!formData.gender) errors.gender = 'Required';
        if (!formData.behaviour) errors.behaviour = 'Required';
        if (!formData.typeOfPet) errors.typeOfPet = 'Required';
        if (!formData.colour) errors.colour = 'Required';
        if (!formData.deadline) errors.deadline = 'Required';
        if (!formData.status) errors.status = 'Required';
        if (!formData.image) errors.image = 'Required';


        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ommited handle file change for now!!
    const handleFileChange = (e) => {
        setFormData(prevState => ({
          ...prevState,
          image: e.target.files[0],
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log('Form validation failed', formErrors);
            return;
        }
        

        const shelterId = localStorage.getItem('id'); 
    const authToken = localStorage.getItem('access_token'); 
    const url = `https://petpal-production.up.railway.app/pet/shelter/${shelterId}/pet/`;

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
      navigate('/shelter/search'); 

    } catch (error) {
      console.error('Error:', error);
 
    }


        console.log('Form submitted successfully', formData);
    };

    return (
        <div className="page-container">
            <div className="main-pet-adoption manrope">
                <div className="container mt-5">
                    <h2 className="text-center mb-4 mt-4 title">Create Pet Listing</h2>
                    <form onSubmit={handleSubmit}>
                        <TextInput 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        label="Pet Name" 
                        error={formErrors.name}
                        />
                        <TextAreaInput 
                        id="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        label="Description" 
                        rows="3"
                        error={formErrors.description}
                        />
                        <TextAreaInput 
                        id="medicalHistory" 
                        value={formData.medicalHistory} 
                        onChange={handleChange} 
                        label="Medical History" 
                        rows="3"
                        error={formErrors.medicalHistory}
                        />
                        <TextInput 
                        id="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        label="Location" 
                        error={formErrors.location}
                        placeholder="PAW Station, ON"
                        />
                        <TextInput 
                        id="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        label="Age" 
                        error={formErrors.age}
                        />
                        <TextInput 
                        id="colour" 
                        value={formData.colour} 
                        onChange={handleChange} 
                        label="Colour" 
                        options={sizeOptions}
                        error={formErrors.colour}
                        />
                        <SelectInput 
                        id="size" 
                        value={formData.size} 
                        onChange={handleChange} 
                        label="Size" 
                        options={sizeOptions}
                        error={formErrors.size}
                        />
                        
                        <SelectInput 
                        id="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        label="Gender" 
                        options={genderOptions}
                        error={formErrors.gender}
                        />
                        <SelectInput 
                        id="behaviour" 
                        value={formData.behaviour} 
                        onChange={handleChange} 
                        label="Behaviour" 
                        options={behaviourOptions}
                        error={formErrors.behaviour}
                        />
                        <SelectInput 
                        id="typeOfPet" 
                        value={formData.type} 
                        onChange={handleChange} 
                        label="Type" 
                        options={typeOfPetOptions}
                        error={formErrors.type}
                        />
                        <SelectInput 
                        id="status" 
                        value={formData.status} 
                        onChange={handleChange} 
                        label="Status" 
                        options={statusOptions}
                        error={formErrors.status}
                        />
                        <DateInput 
                        id="deadline" 
                        value={formData.deadline} 
                        onChange={handleChange} 
                        label="Deadline" 
                        min="2021-09-01" 
                        max="2024-12-31"
                        error={formErrors.deadline}
                        />
                        <FileInput 
                        id="image" 
                        onChange={handleFileChange} 
                        label="Image"
                        error={formErrors.image}
                        />
                
                        <div className="row mb-3 mt-4">
                            <div className="col-12">
                                <button className="yellowButton" type="submit" >Submit</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default AdoptionForm;
