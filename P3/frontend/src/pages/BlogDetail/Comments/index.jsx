import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import CommentsList from "./CommentsList";
import 'bootstrap/dist/css/bootstrap.min.css';

const Comments = ({ blogId, author }) => {
    const [ comments, setComments ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ hasMore, setHasMore ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ like, setLike ] = useState(false);
    const [ likes, setLikes ] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const userId = localStorage.getItem('id');
    const userType = localStorage.getItem('user_type');

    // Retrieve comments
    const fetchComments = async () => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/blogs/comments/${blogId}?page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(!response.ok) {
                console.log("ERROR");
            }
            return response.json();
        })
        .then(data => {

            setComments((prevComments) => {
              const newComments = data.results.filter(result => !prevComments.some(comment => comment.id === result.id));
              return [...prevComments, ...newComments];
            });
            setHasMore(data.next !== null);            
        })
    };

    useEffect(() => {
      fetchComments();
    }, [currentPage]);

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      const fetchLikes = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/blogs/${blogId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (!response.ok) {
            setLikes(0);
            return;
          }
  
          const data = await response.json();
          setLikes(data.likes);
          
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
  
      fetchLikes();
    }, [blogId]);


    useEffect(() => {
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/blogs/liked/${blogId}`, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      })
      .then(response => {
          if(!response.ok) {
              console.log("ERROR");
          }
          return response.json();
      })
      .then(data => {
          setLike(data.liked);            
      })
      .catch(error => console.log(error))
    }, [blogId, userId]);



    const handleSeeMoreClick = () => {
      if (hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const handleSeeLessClick = () => {
        setCurrentPage(1);
        setComments((prevComments) => prevComments.slice(0, 8));
        scrollToComments();
    };

    const scrollToComments = () => {
      const commentsSection = document.getElementById('comments');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/accounts/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(!response.ok) {
                console.log("ERROR");
            }
            return response.json();
        })
        .then(data => {
            setUserName(data.name ?? data.username)            
        })
    }, [userId]);

    const handleLiked = () => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/blogs/like/${blogId}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {"user": userId, 
               "blog": blogId,
              }
            )
        })
        .then(response => {
            if(!response.ok) {
                console.log("ERROR");
            }
            return response.json();
        })
        .then(data => {
          setLike(prevLike => !prevLike);
          setLikes((prevLikes) => (prevLikes + 1));       
        })
        .catch(error => console.log(error))
    }

    const handleUnliked = () => {
      const token = localStorage.getItem('access_token');
      fetch(`http://localhost:8000/blogs/liked/${blogId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if(!response.ok) {
                console.log("ERROR");
                throw new Error('Failed to unlike blog');
            }
        })
        .then(data => {
          setLike(prevLike => !prevLike);
          setLikes((prevLikes) => (prevLikes - 1));       
        })
    }

    const handleLikeClick = () => {
      if (like) {
        handleUnliked();
      } else {
        handleLiked();
      }
    };
    

    console.log("comments", comments);

    return (
        <div className="container justify-content-start text-start" id="comments">
        <div className="commentRow">
          <h2 className="subtitle2" id="commentSubtitle">Comments: </h2>
          {userType === "Seeker" && (
            <>
            <Link to={`${window.location.pathname}/comment`} className="commentClick">Leave a comment {'>'}</Link>
            <div className="like-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleLikeClick}>
            {like ? (
              <i className="bi bi-suit-heart-fill like-heart filled"></i>
            ) : (
              <i className={`bi bi-suit-heart${isHovered ? '-fill' : ''} like-heart`}></i>
            )}
            <p id="num-likes">{likes}</p>
          </div>
            </>
          )}
        </div>
        {comments.length > 0 ? (
          <>
          <CommentsList comments={comments} className="commentBox" isComment={true} userName={userName} blogId={blogId} author={author} />
          <div className="container" id="seeMoreCollapse">
          {hasMore && (
            <button className="btn commentClick" id="seeMore" onClick={handleSeeMoreClick}>
              <div className="text-collapsed">See more <i className="bi bi-chevron-right chevron"></i></div>
            </button>
          )}
          {!hasMore && currentPage > 1 && (
            <button className="btn commentClick" id="seeMore" onClick={handleSeeLessClick}>
              <div className="text-expanded">See less<i className="bi bi-chevron-up chevron"></i></div>
            </button>
          )}
          </div>
          </>
        ) : (
          <h4 className="no-comments"><i>No comments yet</i></h4>
        )}
        
      </div>
    )
}

export default Comments;