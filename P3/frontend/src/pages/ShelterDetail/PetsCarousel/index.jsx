import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PetGrid from './PetGrid';
import Buddy from "../../../assets/images/buddy.jpg"
import Calcifer from "../../../assets/images/calcifer.jpg"
import Quokkie from "../../../assets/images/quokkie.png"
import HokeyPokey from "../../../assets/images/hokey-pokey.jpg"
import Hamtaro from "../../../assets/images/hamtaro.jpg"
import Jiji from "../../../assets/images/jiji.jpg"
import Totoro from "../../../assets/images/totoro.jpg"
import Sadaharu from "../../../assets/images/sadaharu.jpg"
import Perry from "../../../assets/images/perry.jpg"

const PetsCarousel = ({shelterId, shelterName}) => {
    const navigate = useNavigate();
    const userType = localStorage.getItem('user_type');
    const filter = userType === "Seeker" ? `shelter_name=${encodeURI(shelterName)}&` : "";
    console.log(filter);
    const [totalPages, setTotalPages] = useState(0);
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const dummyPets = {
            "count": 5,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 2,
                    "name": "Buddy",
                    "pet_image_1": Buddy
                },
                {
                    "id": 3,
                    "name": "Quokkie",
                    "pet_image_1": Quokkie
                },
                {
                    "id": 1,
                    "name": "Calcifer",
                    "pet_image_1": Calcifer
                },
                {
                    "id": 10,
                    "name": "Hokey Pokey",
                    "pet_image_1": HokeyPokey
                },
                {
                    "id": 4,
                    "name": "Hamtaro",
                    "pet_image_1": Hamtaro
                },
                {
                    "id": 5,
                    "name": "Jiji",
                    "pet_image_1": Jiji
                },
                {
                    "id": 6,
                    "name": "Totoro",
                    "pet_image_1": Totoro
                },
                {
                    "id": 7,
                    "name": "Sadaharu",
                    "pet_image_1": Sadaharu
                },
            ]
        

        }
 
    useEffect(() => {
        const token = localStorage.getItem('access_token'); 
        fetch(`http://localhost:8000/pet/search/?${filter}page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(shelterId);
            console.log("PETS")
            if(!response.ok) {
                console.error('Error:', response.status, response.statusText);
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // setPets(dummyPets.results)
            setPets(data.results);
            if (currentPage === 1) {
                // setTotalPages(Math.ceil(dummyPets.count / 8));
                setTotalPages(Math.ceil(data.count / 8));
                // setTotalPages(3); // WILL REMOVE
                console.log("pages", totalPages);
            }
            console.log("PETS", pets);
        })
    }, [shelterId, shelterName, currentPage]);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    console.log("current", currentPage);
    console.log(pets);

    return (
        <div className="container" id="carouselContainer">
            {totalPages === 0 ? (
                <h2>No pets yet!</h2>
            ) : (
                <div id="petsCarousel" className="carousel slide" data-bs-interval="false">
          <div className="carousel-indicators">
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index}
                    className={`carouselIndicator ${index === currentPage - 1 ? 'active' : ''}`} 
                    type="button" 
                    data-bs-target="#petsCarousel" 
                    data-bs-slide-to={index} 
                    aria-current={index === currentPage - 1 ? "true" : ""}>
                </button>
            )) }
            {console.log(`totalPages: ${totalPages}, currentPage: ${currentPage}`)}
          </div>
          <div className="carousel-inner">
            {Array.from({ length: totalPages }).map((_, index) => (
                <div className={`carousel-item ${index === currentPage - 1 ? 'active' : ''}`}  data-bs-interval="false">
                <div className="container align-middle" id="carouselPage">
                  <button className="carousel-control-prev carousel-btn" type="button" 
                  data-bs-target="#petsCarousel" data-bs-slide="prev"
                  onClick={handlePrevPage}>
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button className="carousel-control-next carousel-btn" type="button" 
                  data-bs-target="#petsCarousel" data-bs-slide="next"
                  onClick={handleNextPage}>
                    <span className="carousel-control-next-icon"></span>
                  </button>
                  <PetGrid pets={pets} />
                </div>
              </div>
            ))}
            
        </div>
      </div>
            )}
        
      </div>
    )
}

export default PetsCarousel;