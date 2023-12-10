import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"

const CreateComment = () => {
    const location = useLocation();
    const { blogId } = useParams();
    const [ blog, setBlog ] = useState({});
    const [ user, setUser ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const [ characterError, setCharacterError ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('Error submitting');
    const userId = localStorage.getItem('id');
    const userType = localStorage.getItem('user_type');
    const token = localStorage.getItem('access_token'); 
    const maxCharacterCount = 350;

    let navigate = useNavigate();

    const remainingCharacters = maxCharacterCount - comment.length;
    console.log(userId);

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(blogId);
            if(!response.ok) {
                navigate('/404');
                window.history.replaceState(null, null, `/blog/${blogId}/comment`);
            }
            return response.json();
        })
        .then(data => {
            if (data.user_type !== 'Seeker') {
                navigate('/404');
                window.history.replaceState(null, null, `/blog/${blogId}/comment`);
            } else {
                setUser(data.username);
            }
            
        })
    }, [userId]);

    useEffect(() => {
        fetch(`http://localhost:8000/blogs/${blogId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log(blogId);
            if(!response.ok) {
                console.log(response);
                navigate('/404');
                window.history.replaceState(null, null, `/blog/${blogId}/comment`);
            }
            return response.json();
        })
        .then(data => {
                console.log("DATA", data);
                setBlog(data);            
        })
        .catch(error => {
            console.log("ERROR", error);
        })
    }, [blogId]);

    console.log(blogId);
    console.log(blog);

    
    const handleCommentChange = (e) => {
        const input = e.target.value;
        if (input.length <= maxCharacterCount) {
            setComment(input);
            setCharacterError(false);
        } else {
            setCharacterError(true);
        }
    }
  
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (characterError) {
            return;
        }

        const requestBody = {
            'commenter': userId,
            'commented_blog': blogId,
            'text': comment,
        };
        console.log(requestBody);
        fetch(`http://localhost:8000/blogs/response/${blogId}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error submitting comment:", response.status);
                throw Error(response.statusText)
            }
            return response.json();
        })
        .then(data => {
            setSubmitted(true);
            console.log("Success!")
            setError(false);
            navigate(location.pathname.replace('/comment', ''));
        })
        .catch(error => {
            console.error("Error:", error.message);
            setError(true);
            if (comment.length === 0) {
                setErrorMessage("You cannot leave an empty comment");
            } else {
                setErrorMessage("Error submitting");
            }
        });
    }



    return (
        <div className="main px-6 pt-6">
        <div id="title" className="comment-title">Leave a Comment About</div>
        <div className="blog-name"><i>{blog && blog.title}</i></div>
        <form method="post" id="commentForm">
          <div className="container justify-content-start text-start" id="userComment">
                <div id="commentGrid">
                  <div className="grid-item commentGridItem" id="userGridItem">
                    <h2 className="userNameSubtitle">{user}</h2>
                  </div>
                </div>
                  <textarea id="comment" rows="5" required maxLength={maxCharacterCount} placeholder="Write your comment here"
                    onChange={handleCommentChange}
                  ></textarea>
                 
          </div>
          {characterError && <p className="max-char-limit">Character count exceeds the limit.</p>}
          {remainingCharacters <= 10 && !characterError && <p className="max-char-limit">You have {remainingCharacters} characters remaining.</p>}
          <button id="submitButton" onClick={handleCommentSubmit}>Submit</button>
          {error && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    )
}

export default CreateComment;