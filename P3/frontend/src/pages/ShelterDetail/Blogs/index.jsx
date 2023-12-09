import "./style.css";

const Blogs = () => {
    return (
        <div className="container justify-content-start text-start">
          <h2 className="subtitle2">Blogs:</h2>
          <div className="blog-container">
            <p className="textInfo">Blog1</p>
            <button className="blog-button blog-edit">Edit</button>
            <button className="blog-button blog-delete">Delete</button>
          </div>
          <div className="blog-container"><p className="textInfo">Blog1</p></div>
        </div>
    )
}

export default Blogs;