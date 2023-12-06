import "./style.css"
import NotFoundImage from "../../assets/images/404-image.gif"

const NotFound = () => {
    return <div id="error404-main">
        <div className="error404">
        <h1 className="error404-title">Error 404</h1>
            <p className="error404-text">Your requested page is not found. Please double check the URL and try again.</p>
            <img className="error404-image"
                src={NotFoundImage}
                alt="404 Not Found"
            />
        </div>
    </div>
}

export default NotFound;