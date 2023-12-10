import React, { useState } from "react";
import Comment from "./Comment";

const ReviewsList = ({ comments, className, isReview, nestingLevel = 0, userName, shelterName, shelterId }) => {
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