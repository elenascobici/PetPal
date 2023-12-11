import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/blogs/${blog.id}`);
    };

    const formatDate = (datetime) => {
        return datetime.split('T')[0];
    };

    return (
        <div className="blog-card" onClick={handleCardClick}>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-content">{blog.content}</p>
            <p className="blog-date">{formatDate(blog.created_at)}</p>
        </div>
    );
};

export default BlogCard;
