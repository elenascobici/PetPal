import React, { useState } from "react";
import { json, useNavigate } from 'react-router-dom';

const Rating = ({ shelterId, shelterName }) => {
    let navigate = useNavigate();
    const [ rating, setRating ] = useState(null);
    const [ hover, setHover ] = useState(null);
    const userId = localStorage.getItem('id');

    const handleRatingClick = (clickedRating) => {
        const token = localStorage.getItem('access_token'); 
        console.log(clickedRating);
        fetch(`http://localhost:8000/shelter/${shelterId}/details/rating/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'user': userId,
                'shelter': shelterId,
                'value': clickedRating,
            })
        })
        .then(response => {
            console.log(shelterId);
            if(!response.ok) {
                console.log("ERROR");
            }
            return response.json();
        })
        .then(data => {
            setRating(data.value);
        })
    };

    return (
        <div class="rating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label 
                    className={`bi bi-star-fill ${currentRating <= (hover || rating) ? "star" : "emptyStar"}`}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    >
                    <input 
                        type="radio" 
                        id="star" 
                        name="rating" 
                        value={currentRating} 
                        onClick={() => handleRatingClick(currentRating)}/>
                    </label>
                )
            })}
          </div>
          
    )
}

export default Rating;