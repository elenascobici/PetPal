import React, { useEffect, useState } from "react";

const ReplyBox = ({userName, userId, commentId, nestingLevel, shelterId, replyClick, handleNewReply}) => {
    const [reply, setReply] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const maxCharacterCount = 350;
    const [characterError, setCharacterError] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleReplyChange = (e) => {
        const input = e.target.value;
        if (input.length <= maxCharacterCount) {
            setReply(input);
            setCharacterError(false);
        } else {
            setCharacterError(true);
        }
    }

    const remainingCharacters = maxCharacterCount - reply.length;
  
    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (characterError) {
            return;
        }
        console.log("REPLIED")
        const token = localStorage.getItem("access_token");
        fetch(`http://localhost:8000/shelter/${shelterId}/details/comments/?comment_id=${commentId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'commenter': userId,
                'text': reply,
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error submitting reply");
                throw Error(response.statusText)
            }
            return response.json();
        })
        .then(data => {
            setSubmitted(true);
            replyClick();
            handleNewReply(data);
            setError(false);
        })
        .catch(error => {
            console.error("Error:", error.message);
            setError(true);
            if (reply.length === 0) {
                setErrorMessage("You cannot leave an empty reply");
            } else {
                setErrorMessage("Error submitting");
            }
        });
    }
    console.log(commentId);
    const replyWidth = `${100 - 3 * nestingLevel}%`;
    return (
        <div className="container justify-content-start text-start replyBox" style={{ width: replyWidth }}>
        <div className="col d-flex justify-content-start">
          <h3 className="reviewerName responderName">{userName}</h3>
        </div>
        <form method="post" className="replyBoxForm">
          <textarea 
            id="replyComment" 
            rows = "1" 
            type="text" 
            name="replyComment" 
            className="reviewText" 
            required placeholder="Reply here..."
            onChange={handleReplyChange}
            maxLength={maxCharacterCount}
            ></textarea>
            {characterError && <p className="max-char-limit">Character count exceeds the limit.</p>}
            {remainingCharacters <= 10 && !characterError && <p className="max-char-limit">You have {remainingCharacters} characters remaining.</p>}
          <button className="reply-submit" onClick={handleReplySubmit}>Submit</button>
          {error && <p className="error-message-small">{errorMessage}</p>}
        </form>    
      </div>
    )
}

export default ReplyBox;