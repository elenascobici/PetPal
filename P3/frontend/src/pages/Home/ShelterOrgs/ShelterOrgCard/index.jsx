import { Link } from "react-router-dom";

const ShelterOrgCard = ({ link, image }) => {
    return (
        <Link to={link} >
            <img src={image} className="shelterLogo" />
        </Link>
    )
}

export default ShelterOrgCard;