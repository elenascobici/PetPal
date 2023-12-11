import { Link, useNavigate } from "react-router-dom";

const VectorButtons = ({ link, label, id, image, type }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        const filters = {
        type: type,
        };
        window.history.pushState(filters, "", link);
        window.location.reload(false);
        navigate(link);
    };

    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-xs-12 text-center d-flex justify-content-center">
            {type ? (
                <button onClick={handleButtonClick} className="circle">
                    <img className="vector" id={id} src={image} />
                    <div className="vectorLabel">{label}</div>
                </button>
            ) : (
                <Link to={ link } className="circle">
                <img className="vector" id={id} src={image} />
                <div className="vectorLabel">{label}</div>
                </Link>
            )}
            
        </div>
    )
}

export default VectorButtons;