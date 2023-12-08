import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactDetails from './ContactDetails';
import MissionStatement from './MissionStatement';
import PawPatrol from "../../assets/images/pawpatrol.png"
import PetsCarousel from './PetsCarousel';


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
        
      <div className="container justify-content-start text-start" id="reviews">
        <div className="reviewRow">
          <h2 className="subtitle2" id="reviewSubtitle">Reviews: </h2>
          <form className="rating" action="https://postman-echo.com/post" method="post">
            <input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="5" className="bi bi-star-fill"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="4" className="bi bi-star-fill"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="3" className="bi bi-star-fill"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="2" className="bi bi-star-fill"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="1" className="bi bi-star-fill"></label>
          </form>
          
         <i className="bi bi-star star"></i>
          <i className="bi bi-star star"></i>
          <i className="bi bi-star star"></i>
          <i className="bi bi-star star"></i>
          <i className="bi bi-star star"></i>

          <a href="review.html" className="reviewClick">Leave a review {'>'}</a>


        </div>
      <div className="container justify-content-start text-start" id="reviewBox">
        <div className="row align-middle">
          <div className="col d-flex justify-content-start">
            <h3 className="reviewerName">Sosuke</h3>
          </div>
          <div className="col d-flex justify-content-end stars">
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
          </div>
        </div>
        <div className="reviewText">
          Lovely organization! I adopted a pet goldfish and named her Ponyo, and she is so adorable! 
          Would love to adopt another pet from them again and give Ponyo and me some more friends!
        </div>
        <div className="container" id="replyCollapse">
          <a data-bs-target="#replyForm" className="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply  {'>'}
          </a>
      </div>
      </div>
      <div className="container justify-content-start text-start collapse replyBox" id="replyForm">
            <div className="col d-flex justify-content-start">
              <h3 className="reviewerName responderName">Jack</h3>
            </div>
          <form action="#" method="post" id="replyBoxForm">
            <textarea id="replyComment" rows = "1" type="text" name="replyComment" className="reviewText" required placeholder="Reply  {'>'}here..."></textarea>
            <a href="#" type="submit" className="submit">Submit</a>
          </form>    
      </div>
      <div className="container justify-content-start text-start" id="reviewBox">
        <div className="row align-middle">
          <div className="col d-flex justify-content-start">
            <h3 className="reviewerName">Vante</h3>
          </div>
          <div className="col d-flex justify-content-end stars">
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
          </div>
        </div>
        <div className="reviewText">
          Adopted a pet dog, Yeontan! He’s a little sick, but Paw Patrol Rescue did a great job taking care of him! 
          He’s a new member of the family!
        </div>
        <div className="container" id="replyCollapse">
          <a data-bs-target="#replyForm2" className="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply  {'>'}
          </a>
        </div>
      </div>
      <div className="container justify-content-start text-start collapse replyBox" id="replyForm2">
        <div className="col d-flex justify-content-start">
          <h3 className="reviewerName responderName">Jack</h3>
        </div>
        <form action="#" method="post" id="replyBoxForm">
          <textarea id="replyComment" rows = "1" type="text" name="replyComment" className="reviewText" required placeholder="Reply  {'>'}here..."></textarea>
          <a href="#" type="submit" className="submit">Submit</a>
        </form>    
      </div>
      <div className="container justify-content-start text-start" id="replyBox">
        <div className="row align-middle">
          <div className="col d-flex justify-content-start">
            <h3 className="reviewerName"  id="underlined">Paw Patrol</h3>
          </div>
        </div>
        <div className="reviewText">
          We're glad to here that! We hope Yeontan gets better soon!
        </div>
        <div className="container" id="replyCollapse">
          <a data-bs-target="#replyForm3" className="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply  {'>'}
          </a>
        </div>
      </div>
      <div className="container justify-content-start text-start collapse replyBox" id="replyForm3">
        <div className="col d-flex justify-content-start">
          <h3 className="reviewerName responderName">Jack</h3>
        </div>
        <form action="#" method="post" id="replyBoxForm">
          <textarea id="replyComment" rows = "1" type="text" name="replyComment" className="reviewText" required placeholder="Reply  {'>'}here..."></textarea>
          <a href="#" type="submit" className="submit">Submit</a>
        </form>    
      </div>
      
      <div className="container justify-content-start text-start" id="reviewBox">
        <div className="row align-middle">
          <div className="col d-flex justify-content-start">
            <h3 className="reviewerName">Zura</h3>
          </div>
          <div className="col d-flex justify-content-end stars">
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star"></i>
            <i className="bi bi-star-fill star emptyStar"></i>
          </div>
        </div>
        <div className="reviewText">
          Met my new best friend Elizabeth the duck. She’s well-behaved but it wasn’t a super easy 
          process to adopt her from the shelter. I still love her though!
        </div>
        <div className="container" id="replyCollapse">
          <a className="btn reply" data-bs-toggle="collapse" role="button" 
          aria-expanded="false" aria-controls="replyForm" id="replyButton">
            Reply  {'>'}
          </a>
        </div>
      </div>      
      </div>
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