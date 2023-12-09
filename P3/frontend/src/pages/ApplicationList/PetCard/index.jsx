import "../style.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function PetCard({listing, image}){

    // retrieve pet from listing
    const [pet, setPet] = useState({});
    const navigate = useNavigate();

    const status = {
      'A': 'Accepted',
      'W': 'Withdrawn',
      'P': 'Pending',
      'D': 'Declines',
    }

    const formatTime = (time) => {
      var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ]
      var date = time.toString().slice(0,10);
      var year = date.substring(0,4);
      var month= date.substring(5,7);
      var day= date.substring(8,10);
      // console.log(month);
      return  months[parseInt(month) - 1] + ' ' + day + ', ' + year;
    }

    useEffect(() => { 
      // console.log("LAST PAGE? " + lastPage);
      if(!listing.fill){
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/pet/${listing.pet}/`, {
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
            setPet(data[0]);
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
      }
        
    }, [listing]);
    return <>
        {/* <div class={`col-12 col-lg-${(numPets % 3 === 1 ? 4 : numPets % 3 === 2 ? 6 : numPets % 3 === 0 ? 4 : 4)} card`}> */}
        {/* <div className="grid-item" > */}
        <div class="grid-item card mb-3 rounded-card centered">
          {!listing.fill ? (<div className="card mb-3 rounded-card centered"> 
          {pet.pet_image_1 ? <img className="card-img-top" src={`http://localhost:8000/pet/pet-image/${pet.pet_image_1}`} alt={pet.name} /> : null}
          <div class="card-body">
            <h5 class="card-title">{pet.name}</h5>
            <p class="card-text">
              <strong>Status:</strong> {status[listing.status]}
              <br/>
              <strong>Applied On:</strong> 
              <br/>
              {formatTime(listing.creation_time)}
            </p>
            <a class="appView" onClick={() => navigate(`/application/${listing.id}/`)}>View Application</a>
          </div> </div>) : <div className="blank"></div>}
          
        </div>
        {/* </div> */}
    </>;
}

export default PetCard;