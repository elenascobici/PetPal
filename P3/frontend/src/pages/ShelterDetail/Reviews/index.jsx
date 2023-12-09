import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import Rating from "./Rating";
import AverageRating from "./AverageRating";
import ReviewsList from "./ReviewsList";

const Reviews = ({ shelterId, shelterName }) => {
    const [ rating, setRating ] = useState(null);
    const [ reviews, setReviews ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ hasMore, setHasMore ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const userId = localStorage.getItem('id');
    const userType = localStorage.getItem('user_type');

    // Retrieve comments
    const fetchComments = async () => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/shelter/${shelterId}/details/comments?page=${currentPage}`, {
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

            setReviews((prevReviews) => {
              const newReviews = data.results.filter(result => !prevReviews.some(review => review.id === result.id));
              return [...prevReviews, ...newReviews];
            });
            setHasMore(data.next !== null);            
        })
    };

    useEffect(() => {
      fetchComments();
    }, [currentPage]);


    const handleSeeMoreClick = () => {
      if (hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const handleSeeLessClick = () => {
        setCurrentPage(1);
        setReviews((prevReviews) => prevReviews.slice(0, 8));
        scrollToReviews();
    };

    const scrollToReviews = () => {
      const reviewsSection = document.getElementById('reviews');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

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

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/accounts/profile/${userId}`, {
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
            setUserName(data.name ?? data.username)            
        })
    }, [userId]);

    console.log("reviews", reviews);

    return (
        <div className="container justify-content-start text-start" id="reviews">
        <div className="reviewRow">
          <h2 className="subtitle2" id="reviewSubtitle">Reviews: </h2>
          
          {userType === "Seeker" && (
            <>
            <Rating rating={rating} handleRatingClick={handleRatingClick} />
            <Link to={`${window.location.pathname}/review`} className="reviewClick">Leave a review {'>'}</Link>
            </>
          )}
          
          <AverageRating shelterId={shelterId} rating={rating}  />
        </div>
        {reviews.length > 0 ? (
          <>
          <ReviewsList comments={reviews} className="reviewBox" isReview={true} userName={userName} shelterName={shelterName} shelterId={shelterId} />
          <div className="container" id="seeMoreCollapse">
          {hasMore && (
            <button className="btn reviewClick" id="seeMore" onClick={handleSeeMoreClick}>
              <div className="text-collapsed">See more <i className="bi bi-chevron-right chevron"></i></div>
            </button>
          )}
          {!hasMore && currentPage > 1 && (
            <button className="btn reviewClick" id="seeMore" onClick={handleSeeLessClick}>
              <div className="text-expanded">See less<i className="bi bi-chevron-up chevron"></i></div>
            </button>
          )}
          </div>
          </>
        ) : (
          <h4 className="no-reviews"><i>No reviews yet</i></h4>
        )}
        
      </div>
    )
}

export default Reviews;