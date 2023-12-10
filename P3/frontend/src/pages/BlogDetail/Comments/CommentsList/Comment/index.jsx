import React, { useState } from "react";
import ReplyBox from "./ReplyBox";
import CommentsList from "..";

const Comment = ({ comment, className, isReview, nestingLevel, userName, blogId, author }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyClick, setReplyClick] = useState(false);
    const [replySubmitted, setReplySubmitted] = useState(false);
    const userId = localStorage.getItem('id');
    const userType = localStorage.getItem('user_type');

    const add_breaks = (text) => {
      if (typeof text !== 'string') {
        return text;
      }
        return text.split('\n').map((line, index) => {
            return (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            )
            
        })
    };

    const handleSeeReplies = () => {
      setShowReplies(!showReplies);
    }

    const handleReplyClick = () => {
      setReplyClick((prevReplyClick) => !prevReplyClick); 
      console.log(replyClick);
    }

    const handleNewReply = (newReplyData) => {
      comment.replies = [...comment.replies, newReplyData];
    }

    const replyWidth = `${100 - 3 * nestingLevel}%`;

    return (
      <>
        <div className={`container justify-content-start text-start ${className}`}  style={{ width: replyWidth }}>
        <div className="row align-middle">
          <div className="col d-flex justify-content-start">
            <h3 
            className={`reviewerName ${author === comment.commenter_display_name ? "underlined" : ""}`}>
            {comment.commenter_display_name}</h3>
          </div>
          
        </div>
        <div className="reviewText">
          {add_breaks(comment.text)}
        </div>
        <div className="container replyCollapse">
          {comment.replies && comment.replies.length > 0 && (
            <button className="btn see-replies" onClick={handleSeeReplies}>
              {showReplies ? "Hide replies" : "See replies"}
            </button>
          )}
          {(userType === 'Seeker' || userId === author) && (
            <button className="btn reply replyButton"
              onClick={handleReplyClick} >
              Reply {'>'}
          </button>
          )}
      </div>
      </div>
      {replyClick && (
        <ReplyBox 
          userName={userName} userId={userId} 
          commentId={comment.id} 
          nestingLevel={nestingLevel+1} 
          blogId={blogId}
          replyClick={handleReplyClick}
          handleNewReply={handleNewReply}
        />
      )}

      {showReplies && (
        <CommentsList 
            key={comment.id} 
            comments={comment.replies} 
            className="replyBox" 
            isReview={false}
            nestingLevel={nestingLevel + 1}
            userName={userName}
            blogId={blogId}
            author={author}
            />
        )}
      </>
    )
}   

export default Comment;