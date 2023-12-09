import React, { useState } from "react";
import { json, useNavigate } from 'react-router-dom';

const Rating = ({ rating, handleRatingClick }) => {
    const [ hover, setHover ] = useState(null);

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