import React, { useState, useEffect } from "react";
import { json, useNavigate } from 'react-router-dom';

const AverageRating = ({ shelterId, rating }) => {
    const token = localStorage.getItem('access_token');
    const [avgRating, setAvgRating] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/${shelterId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(!response.ok) {
                console.log("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            setAvgRating(data.average_rating);
        })
    }, [rating]);
    
    return (
        avgRating ? (
            <div className="avg-rating">
                <div className="bi bi-star-fill star"></div>
                <div className="avg-rating-num">{avgRating}</div>
            </div>
        ) : (
            <></>
        )
        
          
    )
}

export default AverageRating;