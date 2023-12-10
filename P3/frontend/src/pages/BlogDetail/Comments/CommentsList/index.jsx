import React, { useState } from "react";
import Comment from "./Comment";

const CommentsList = ({ comments, className, isReview, nestingLevel = 0, userName, blogId, author }) => {
    return (
        <>
            {comments.map((comment, index) => (
                <Comment key={`${comment.id}-${index}`} 
                    comment={comment} className={className} 
                    isReview={isReview} 
                    nestingLevel={nestingLevel}
                    userName={userName}
                    blogId={blogId}
                    author={author}
                  />
            ))}
            
        </>
    )
}   

export default CommentsList;