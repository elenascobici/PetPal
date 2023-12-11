import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import "./style.css";
import Animals from "../../assets/images/sign-up-animals.jpg";

function format_date(dateString) {
    const dateObject = new Date(dateString);

    const options = { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = dateObject.toLocaleString('en-US', options);

    return formattedDate;
};

const add_breaks = (text) => {
  if (typeof text !== 'string') {
    return;
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

const BlogDetail = () => {
  const {blogId} = useParams();
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState('');
  const userType = localStorage.getItem('user_type');
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://petpal-production.up.railway.app/blogs/${blogId}`,
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
            `/blogs/${blogId}`
          );
          return;
        }

        const data = await response.json();
        setBlog(data);
        
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!blog.author) {
      return;
    }
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://petpal-production.up.railway.app/accounts/profile/${blog.author}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.log("RESPONSE", response);
          navigate("/404");
          window.history.replaceState(
            null,
            null,
            `/blogs/${blogId}`
          );
          return;
        }

        const data = await response.json();
        setAuthor(data.name);
        
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBlog();
  }, [blog]);

  const handleViewShelter = () => {
    navigate(`/shelter/${blog.author}/${author}`);
  };

  const handleSeeMore = () => {
    navigate(`/blogs/`);
  };


  console.log(blog);

    return (
      <div id="blog-page">
        <h1 id="blog-title">{blog.title}</h1>
        <img id="blog-image" src={blog.banner_image} />
        <h2 id="blog-author">Author: {author}</h2>
        <h3 id="blog-last-updated">Last updated: {format_date(blog.updated_at)}</h3>
        <p id="blog-content">{add_breaks(blog.content)}</p>
        <Comments blogId={blogId} author={blog.author} />
        <div className="blog-btn-container">
          <button className="blog-button" onClick={handleViewShelter}>View shelter</button>
          <button className="blog-button" onClick={handleSeeMore}>See more blogs</button>
        </div>
        
      </div>
    )
  };
  
  export default BlogDetail;