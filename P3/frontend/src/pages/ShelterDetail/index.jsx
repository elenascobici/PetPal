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
            setShelter(data);
        })
    }, [shelterId]);
    
    console.log(shelter.phone);
    // WILL REMOVE
    shelter.phone = '1234567890';
    shelter.profile_picture = PawPatrol;
    shelter.mission_statement = "No job is too big, no pup is too small!\n\nThe rescuers at Paw Patrol Rescue commit themselves to saving all animals in Ontario and provide them with the care and shelter they deserve. We give our animals a proper inspection to ensure they are healthy and ready to find their new homes!"
    
    return (
        <div className="main px-6 pt-6">
      <div id="title">{shelter.name}</div>
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
          <h2 className="subtitle2" id="petsSubtitle">Pets from Paw Patrol Rescue:</h2>
        </div>
        <PetsCarousel shelterId={shelterId} shelterName={shelterName} />
        
        <Reviews shelterId={shelterId} shelterName={shelterName} />
        <div className="container" id="seeMoreCollapse">
          <a data-bs-target="#collapsedReviews" className="btn reviewClick" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="collapsedReviews" id="seeMore">
            <div className="text-collapsed">See more <i className="bi bi-chevron-right chevron"></i></div>
            <div className="text-expanded">See less <i className="bi bi-chevron-up chevron"></i></div>
          </a>
        <div className="container justify-content-start text-start collapse" id="collapsedReviews">
          <div className="container justify-content-start text-start" id="reviewBox">
            <div className="row align-middle">
              <div className="col d-flex justify-content-start">
                <h3 className="reviewerName">Emilia</h3>
              </div>
              <div className="col d-flex justify-content-end stars">
                <i className="bi bi-star-fill star"></i>
                <i className="bi bi-star-fill star"></i>
                <i className="bi bi-star-fill star"></i>
                <i className="bi bi-star-fill star"></i>
                <i className="bi bi-star-fill star" id="emptyStar"></i>
              </div>
            </div>
            <div className="reviewText">
              I adopted a new cat, Puck, from this. He is so cute!! Thanks Paw Patrol Rescue!
            </div>
            <div className="container" id="replyCollapse">
              <a className="btn reply" data-bs-toggle="collapse" role="button" 
              aria-expanded="false" aria-controls="replyForm" id="replyButton">
                Reply  {'>'}
              </a>
            </div>
          </div>     
        </div>
      </div>
    </div>
    )
}

export default ShelterDetail;