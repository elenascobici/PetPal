import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const BlogUpdate = () => {
    const {blogId} = useParams();
    let navigate = useNavigate();
    const [blogDetails, setBlogDetails] = useState({
      title: "",
      content: "",
      banner_image: null,
    });
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
  
      fetch(`http://localhost:8000/blogs/${blogId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch blog details");
          }
          return response.json();
        })
        .then((data) => {
          // Set the state with the fetched data
          setBlogDetails({
            title: data.title,
            content: data.content,
            banner_image: data.banner_image,
          });
        })
        .catch((error) => {
          console.error("Error fetching blog details:", error);
          navigate(`/profile`);
        });
    }, [blogId]);

    React.useEffect(() => {
        // Event listener for create button.
        document.getElementById("create-blog-button").onclick = (e) => 
            {
                e.preventDefault();
                // Clear all error messages initially
                document.querySelectorAll(".text-input-error-message").forEach((errorMessageInput) => {
                    errorMessageInput.innerHTML = "";
                })
                fetch(`http://localhost:8000/blogs/${blogId}/`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: new FormData(document.getElementById("create-blog-form")),
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log(response);
                        }
                        else {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        const errorMap = Object.entries(data);
                        for (let [key, value] of errorMap) {
                            const errorElement = document.getElementById(key + "-error");
                            if (errorElement) {
                                errorElement.innerHTML = value;
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                });
            }
    }, [])

    const [bannerPath, setBannerPath] = React.useState("");

    const handleImageUpload = (e) => {
        setBannerPath(URL.createObjectURL(e.target.files[0]));
    }

    const handleCancel = () => {
      navigate(`/profile`);
    };

    const handleSuccessModal = () => {
      alert("Updated!");
      navigate(`/profile`);
    };

    return (
        <form action="" method="post" id="create-blog-form">
            <div class="container gx-0" id="shelterLogoEdit">
                <div class="form-control" id="blogImage">
                    <img id="bannerImageDisplay" src={bannerPath} />
                    <label class="form-label btn" for="banner_image" id="edit">Select blog banner image</label>
                    <input id="banner_image" type="file" 
                        name="banner_image" placeholder="Photo" capture onChange={handleImageUpload}/>
                    <p class="text-input-error-message" id="banner_image-error"></p>
                </div>
            </div>
            <div class="grid-item">
        <label for="inputTitle" id="shelterNameLabel" class="gridLabel">
          Blog Title
        </label>
      </div>
      <div class="grid-item">
        <input
          id="inputTitle"
          type="text"
          name="title"
          class="gridValue"
          required
          value={blogDetails.title}
          onChange={(e) =>
            setBlogDetails((prevDetails) => ({
              ...prevDetails,
              title: e.target.value,
            }))
          }
        ></input>
        <p class="text-input-error-message" id="title-error"></p>
      </div>
      <div class="grid-item">
        <label for="content" id="shelterNameLabel" class="gridLabel">
          Content
        </label>
      </div>
      <div class="grid-item">
        <textarea
          id="content"
          type="text"
          name="content"
          class="gridValue"
          rows={20}
          required
          value={blogDetails.content}
          onChange={(e) =>
            setBlogDetails((prevDetails) => ({
              ...prevDetails,
              content: e.target.value,
            }))
          }
        ></textarea>
      </div>
            <button type="submit" class="editButton" id="create-blog-button" onClick={handleSuccessModal}>Save</button>
            <button onClick={handleCancel} class="editButton" id="cancel-blog-button">Cancel</button>
        </form>
    )
}

export default BlogUpdate;