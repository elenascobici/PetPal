
import Form from "./Form";
import './style.css';
import catImg from '../../assets/images/bg-adoption.jpg';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

function ApplicationForm(){
    const {petID}= useParams();
    const [pet_data, setPetData] = useState({});

    useEffect(() => {
          const token = localStorage.getItem('access_token');
          fetch(`http://localhost:8000/pet/${petID}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('Pet data:', data);
                setPetData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return <>
       <div className="image-wrapper">
            <img className="responsive-image" src={catImg} alt="cat for adoption"/>
       </div>

       <div className="main-pet-adoption manrope">
            <div className="container mt-5">
                <h2 className="text-start mb-4 mt-4 title">General Pet Adoption Application</h2>
                <h4 className="text-start mb-4">Adopter's Details</h4>
               <Form petID={petID}/>
            </div>
       </div>
     </>;
}

export default ApplicationForm;