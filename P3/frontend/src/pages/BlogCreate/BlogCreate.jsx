import React from "react";
import "./style.css";

const BlogCreate = () => {
    React.useEffect(() => {
        // Event listener for create button.
        document.getElementById("create-blog-button").onclick = (e) => 
            {
                e.preventDefault();
                // Clear all error messages initially
                document.querySelectorAll(".text-input-error-message").forEach((errorMessageInput) => {
                    errorMessageInput.innerHTML = "";
                })
                fetch(`http://localhost:8000/blogs/new-blog/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    body: new FormData(document.getElementById("create-blog-form")),
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Created!");
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
            <div class="grid">
                <div class="grid-item">
                    <label for="inputTitle" id="shelterNameLabel" class="gridLabel">Blog Title</label>
                </div>
                <div class="grid-item">
                    <input id="inputTitle" type="text" name="title" class="gridValue" required></input>
                    <p class="text-input-error-message" id="title-error"></p>
                </div>
                <div class="grid-item">
                    <label for="content" id="shelterNameLabel" class="gridLabel">Content</label>
                </div>
                <div class="grid-item">
                    <textarea id="content" type="text" name="content" class="gridValue" rows={20} required></textarea>
                </div>
            </div>
            <button type="submit" class="editButton" id="create-blog-button">Create</button>
        </form>
    )
}

export default BlogCreate;