import React, { useState } from "react";

const ReviewRating = ({ rating }) => {
    return (
        <div class="col d-flex justify-content-end stars">
            {[...Array(5)].map((star, index) => {
                return (
                    <i className={`bi bi-star-fill ${rating >= index + 1 ? "star" : "emptyStar"}`}></i>
                )
            })}
          </div>
          
    )
}

export default ReviewRating;