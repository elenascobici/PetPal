import "../style.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function PetCard({listing, image}){

    // retrieve pet from listing
    const [pet, setPet] = useState({});
    const[user, setUserData] = useState({});
    const navigate = useNavigate();
    const [profilePath, setProfilePath] = useState("");

    const status = {
      'A': 'Accepted',
      'W': 'Withdrawn',
      'P': 'Pending',
      'D': 'Declined',
    }

    const formatTime = (time) => {
      var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ]
      var date = time.toString().slice(0,10);
      var year = date.substring(0,4);
      var month= date.substring(5,7);
      var day= date.substring(8,10);
      return  months[parseInt(month) - 1] + ' ' + day + ', ' + year;
    }

    const fetchProfileData = () => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/accounts/profile/${listing.adopter}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
          })
          .then(response => {
              return response.json();
          })
          .then(data => {
            // console.log(data)
              setUserData(data);
          })
          .catch(error => {
              console.error('Error:', error);
      });
  }

    useEffect(() => { 
      if(!listing.fill){
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/pet/${listing.pet}/?search=`, {
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

    useEffect(() => {
      // Fetch profile picture.
      if (pet.pet_image_1) {
          setProfilePath("http://localhost:8000/pet/pet-image/" + pet.pet_image_1.split('/').pop());
      }

      //Get user if shelter
      if (localStorage.getItem('user_type') === "Shelter"){
        // console.log("we here");
        fetchProfileData();
      }

    }, [pet])

    return <>
          {!listing.fill ? (
            <div class="grid-item card mb-3 rounded-card centered">
              {pet.pet_image_1 ? <img className="card-img-top" src={profilePath} alt={pet.name} /> : null}
              <div class="card-body">
                <h5 class="card-title">{pet.name}</h5>
                <p class="card-text">
                  {user.username && <p><strong>From:</strong> {user.username}</p>}
                  <strong>Status:</strong> {status[listing.status]}
                  <br/>
                  <strong>Applied On:</strong> 
                  <br/>
                  {formatTime(listing.creation_time)}
                </p>
                <a class="appView" onClick={() => navigate(`/application/${listing.id}/`)}>View Application</a>
              </div> 
          </div>) : <div class="grid-item card mb-3 rounded-card centered empty-card"/>}
          
    </>;
}

export default PetCard;