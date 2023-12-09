import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import Rating from '../Rating';

const CreateReview = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { shelterId, shelterName } = useParams();
    const [ shelter, setShelter ] = useState({});
    const [ user, setUser ] = useState('');
    const [ rating, setRating ] = useState(null);
    const [ review, setReview ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const [ characterError, setCharacterError ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('Error submitting');
    const userId = localStorage.getItem('id');
    const userType = localStorage.getItem('user_type');
    const token = localStorage.getItem('access_token'); 
    const maxCharacterCount = 350;

    const remainingCharacters = maxCharacterCount - review.length;

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(shelterId);
            if(!response.ok) {
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}/review`);
            }
            return response.json();
        })
        .then(data => {
            if (data.user_type !== 'Seeker') {
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}/review`);
            } else {
                setUser(data.username);
            }
            
        })
    }, [userId]);

    useEffect(() => {
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
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}/review`);
            }
            return response.json();
        })
        .then(data => {
            if (data.user_type !== 'Shelter') {
                navigate('/404');
                window.history.replaceState(null, null, `/shelter/${shelterId}/${shelterName}/review`);
            } else {
                setShelter(data);
            }
            
        })
    }, [shelterId]);

    console.log(shelterId);
    console.log(userId);

    const handleRatingClick = (clickedRating) => {
        setRating(clickedRating)
    };

    
    const handleReviewChange = (e) => {
        const input = e.target.value;
        if (input.length <= maxCharacterCount) {
            setReview(input);
            setCharacterError(false);
        } else {
            setCharacterError(true);
        }
    }
  
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (characterError) {
            return;
        }

        const requestBody = {
            'commenter': userId,
            'commented_shelter': shelterId,
            'text': review,
        };
        if (rating !== null) {
            requestBody['rating'] = rating;
        }
        fetch(`http://localhost:8000/shelter/${shelterId}/details/review/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error submitting review:", response.status);
                throw Error(response.statusText)
            }
            return response.json();
        })
        .then(data => {
            setSubmitted(true);
            console.log("Success!")
            setError(false);
            navigate(location.pathname.replace('/review', ''));
        })
        .catch(error => {
            console.error("Error:", error.message);
            setError(true);
            if (review.length === 0) {
                setErrorMessage("You cannot leave an empty review");
            } else {
                setErrorMessage("Error submitting");
            }
        });
    }



    return (
        <div className="main px-6 pt-6">
        <div id="title">Leave a Review for {shelterName}</div>
        <form method="post" id="reviewForm">
          <div className="container justify-content-start text-start" id="userReview">
                <div id="reviewGrid">
                  <div className="grid-item reviewGridItem" id="userGridItem">
                    <h2 className="userNameSubtitle">{user}</h2>
                  </div>
                  <div className="grid-item reviewGridItem" id="starsGridItem">
                  <Rating rating={rating} handleRatingClick={handleRatingClick} />
                  </div>
                </div>
                  <textarea id="review" rows="5" required maxLength={maxCharacterCount} placeholder="Write your review here"
                    onChange={handleReviewChange}
                  ></textarea>
                 
          </div>
          {characterError && <p className="max-char-limit">Character count exceeds the limit.</p>}
          {remainingCharacters <= 10 && !characterError && <p className="max-char-limit">You have {remainingCharacters} characters remaining.</p>}
          <button id="submitButton" onClick={handleReviewSubmit}>Submit</button>
          {error && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    )
}

export default CreateReview;