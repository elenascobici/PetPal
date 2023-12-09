import React, { useState } from "react";
import Comment from "./Comment";

const ReviewsList = ({ comments, className, isReview, nestingLevel = 0, userName, shelterName, shelterId }) => {
    // const [updatedComments, setUpdatedComments] = useState(comments);

    // const handleReplySubmit = (commentId, newReplyData) => {
    //     setUpdatedComments((prevComments) => {
    //         return prevComments.map((comment) => {
    //           if (comment.id === commentId) {
    //             return {
    //               ...comment,
    //               replies: [...comment.replies, newReplyData],
    //             };
    //           }
    //           return comment;
    //         });
    //       });
    // };
    return (
        <>
            {comments.map((comment, index) => (
                <Comment key={`${comment.id}-${index}`} 
                    comment={comment} className={className} 
                    isReview={isReview} 
                    nestingLevel={nestingLevel}
                    userName={userName}
                    shelterName={shelterName}
                    shelterId={shelterId} 
                  />
            ))}
            
        </>
    )
}   

export default ReviewsList;