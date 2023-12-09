import React, { useEffect, useState } from "react";

const ReplyBox = ({userName, userId, commentId, nestingLevel, shelterId, replyClick, handleReplySubmitCallback, handleNewReply}) => {
    const [reply, setReply] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    }
  
    const handleReplySubmit = (e) => {
        e.preventDefault();
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
            }
            return response.json();
        })
        .then(data => {
            setSubmitted(true);
            replyClick();
            // handleReplySubmitCallback();
            handleNewReply(data);
        })
    }
    console.log(commentId);
    const replyWidth = `${100 - 3 * nestingLevel}%`;
    return (
        <div className="container justify-content-start text-start replyBox" style={{ width: replyWidth }}>
        <div className="col d-flex justify-content-start">
          <h3 className="reviewerName responderName">{userName}</h3>
        </div>
        <form action="#" method="post" className="replyBoxForm">
          <textarea 
            id="replyComment" 
            rows = "1" 
            type="text" 
            name="replyComment" 
            className="reviewText" 
            required placeholder="Reply here..."
            onChange={handleReplyChange}
            ></textarea>
          <button className="reply-submit" onClick={handleReplySubmit}>Submit</button>
        </form>    
      </div>
    )
}

export default ReplyBox;