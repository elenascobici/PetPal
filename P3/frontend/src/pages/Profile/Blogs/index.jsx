import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

function format_date(dateString) {
    const dateObject = new Date(dateString);

    const options = { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = dateObject.toLocaleString('en-US', options);

    return formattedDate;
};

const Blogs = () => {
    const userId = localStorage.getItem('id');
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      const fetchBlogs = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/blogs/list?shelter=${userId}&page=${currentPage || 1}&page_size=8`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (!response.ok) {
            navigate("/404");
            window.history.replaceState(
              null,
              null,
              `/profile/${userId}`
            );
            return;
          }
  
          const data = await response.json();
          setBlogs(data.results);
          setTotalPages(Math.ceil(data.count / 8));
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
  
      fetchBlogs();
    }, [userId, currentPage]);

    const handleDelete = async (blogId) => {
        const token = localStorage.getItem("access_token");
    
        try {
          const response = await fetch(`http://localhost:8000/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            console.error('Failed to delete blog:', response.status, response.statusText);
            throw Error(response);
          }
    
          // If the deletion is successful, remove the deleted blog from the state
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        } catch (error) {
          console.error('Delete request error:', error);
        }
      };
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const handleEdit = (blogId) => {
      navigate(`/profile/blog-update/${blogId}`);
    };
  
    return (
      <div className="container justify-content-start text-start">
        <h2 className="subtitle2">Blogs:</h2>
  
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-container">
            <div>
              <p className="textInfo">{blog.title}</p>
              <p className="textInfo blog-time">
                <span>{format_date(blog.updated_at)}</span>
              </p>
            </div>
            <div className="button-container">
              <button className="blog-button blog-edit" onClick={() => handleEdit(blog.id)}>Edit</button>
              <button className="blog-button blog-delete" onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          </div>
        ))}
  
        {totalPages > 1 && (
          <div className="blog-pagination">
            <ul className="pagination">
                
                {totalPages > 1 && (
                    <li className="page-item"><button className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    >Previous</button></li>
                )}
    
                {Array.from({ length: totalPages }, (_, index) => (
                <li className="page-item"><button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${currentPage === index + 1 ? "active" : ""} page-link`}
                >
                    {index + 1}
                </button></li>
                ))}
    
                {totalPages > 1 && (
                <li className="page-item"><button  className="page-link" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                >Next</button></li>
                )}
            </ul>
            
          </div>
        )}
      </div>
    );
  };
  
  export default Blogs;