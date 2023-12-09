import React from "react";

const BlogCreate = () => {
    return (
        <form action="" method="post" id="create-blog-form">
            <div class="grid">
                <div class="grid-item">
                    <label for="inputTitle" id="shelterNameLabel" class="gridLabel">Blog Title</label>
                </div>
                <div class="grid-item">
                    <input id="inputTitle" type="text" name="title" class="gridValue" required></input>
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