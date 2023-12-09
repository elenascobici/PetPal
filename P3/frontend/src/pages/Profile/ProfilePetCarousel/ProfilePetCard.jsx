import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePetCard = ({ link, name, image }) => {
    return (
        <div className="grid-item" >
        {name ? (
                <Link to={link} className="pet">
                    <img className="petImage" src={image}/>
                    <div className="petLabel">{name}</div>
                </Link>
        ) : (
          <div type="button" class="pet">
          </div>
        )}
        </div>
    )
}

export default ProfilePetCard;