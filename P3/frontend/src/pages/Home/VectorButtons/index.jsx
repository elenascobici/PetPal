import { Link } from "react-router-dom";

const VectorButtons = ({ link, label, id, image }) => {
    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-xs-12 text-center d-flex justify-content-center">
            <Link to={ link } className="circle">
            <img className="vector" id={id} src={image} />
            <div className="vectorLabel">{label}</div>
            </Link>
        </div>
    )
}

export default VectorButtons;