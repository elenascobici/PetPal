import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetCard = ({ link, name, image }) => {
    console.log(image)
    return (
        <div className="pet-grid-item">
            {name ? (
                <Link to={link} className="pet">
                    {image ? <img className="petImage" src={image} alt={name} /> : null}
                    <div className="petLabel">{name}</div>
                </Link>
            ) : (
                <div className="pet" type="button"></div>
            )}
        </div>
    )
}

export default PetCard;