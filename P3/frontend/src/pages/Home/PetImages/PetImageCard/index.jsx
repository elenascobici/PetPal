import { Link } from "react-router-dom";


const PetImageCard = ({ name, link, image }) => {
    return (
        <div class="col text-center d-flex justify-content-center">
            <Link to={link} className="pet" >
                <img className="petImage" src={image}  />
                <div className="petLabel">{name}</div>
            </Link>
          </div>
    )
}

export default PetImageCard;