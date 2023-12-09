import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactDetails from './ContactDetails';
import MissionStatement from './MissionStatement';
import PawPatrol from "../../assets/images/pawpatrol.png"
import PetsCarousel from './PetsCarousel';
import Reviews from './Reviews';
import Blogs from './Blogs';

function format_location(street, city, province) {
    const location = [];
    if (street) {
        location.push(street);
    }
    if (city) {
        location.push(city);
    }
    if (province) {
        location.push(province);
    }
    return location.join(', ');
}

function format_phone(number) {
    if (!number) {
        return;
    }
    const numberStr = number.toString();
    return `(${numberStr.slice(0, 3)})${numberStr.slice(3, 6)}-${numberStr.slice(6)}`;
}

const ShelterDetail = () => {
    let navigate = useNavigate();
    const { shelterId, shelterName } = useParams();
    const [ shelter, setShelter ] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('access_token'); 
        fetch(`http://localhost:8000/accounts/profile/${shelterId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(shelterId);
            if(!response.ok) {
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.user_type !== 'Shelter') {
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}`);
            } else {
                setShelter(data);
            }
            
        })
    }, [shelterId]);
    
    console.log(shelter.phone);
    console.log("NAME", shelter.name);
    // WILL REMOVE
    // shelter.phone = '1234567890';
    // shelter.profile_picture = PawPatrol;
    // shelter.mission_statement = "No job is too big, no pup is too small!\n\nThe rescuers at Paw Patrol Rescue commit themselves to saving all animals in Ontario and provide them with the care and shelter they deserve. We give our animals a proper inspection to ensure they are healthy and ready to find their new homes!"
    
    return (
        <div className="main" id="shelter-detail-main">
      <div id="shelter-detail-title">{shelter.name}</div>
      {shelter.website_link ? (
        <Link to="https://pawpatrolandfriends.com/" id="webpage" target="_blank">Visit our webpage</Link>
        ):
        (<></>)
      }
      
        <ContactDetails phone={format_phone(shelter.phone)} email={shelter.email} 
            location={format_location(shelter.street, shelter.city, shelter.province)} 
            image={shelter.profile_picture}/>
        <MissionStatement statement={shelter.mission_statement} />
        
        <div className="container justify-content-start text-start">
          <h2 className="subtitle2" id="petsSubtitle">Pets from {shelterName}:</h2>
        </div>
        <PetsCarousel shelterId={shelterId} shelterName={shelterName} />
        <Blogs />
        
        <Reviews shelterId={shelterId} shelterName={shelterName} />
        
    </div>
    )
}

export default ShelterDetail;