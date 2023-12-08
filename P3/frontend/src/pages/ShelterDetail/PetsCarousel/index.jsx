import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PetGrid from './PetGrid';


const PetsCarousel = ({shelterId, shelterName}) => {
    const navigate = useNavigate();
    const userType = localStorage.getItem('user_type');
    const filter = userType === "Seeker" ? `?shelter_name=${encodeURI(shelterName)}` : "";
    console.log(filter);
    const [totalPages, setTotalPages] = useState(0);
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
 
    useEffect(() => {
        const token = localStorage.getItem('access_token'); 
        fetch(`http://localhost:8000/pet/search/${filter}&page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(shelterId);
            if(!response.ok) {
                console.error('Error:', response.status, response.statusText);
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setPets(data.results);
            if (currentPage === 1) {
                setTotalPages(Math.ceil(data.count / 8));
                // setTotalPages(3); // WILL REMOVE
                console.log("pages", totalPages);
            }
        })
    }, [shelterId, shelterName, currentPage]);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
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
                <div className="container align-middle text-center" id="carouselPage">
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