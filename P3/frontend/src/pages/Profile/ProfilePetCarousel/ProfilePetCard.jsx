import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultPet from '../../../assets/images/default-pet.png'

const ProfilePetCard = ({ link, name, image }) => {
    // Fetch pet picture.
    const [picture, setPicture] = React.useState(DefaultPet);
    React.useEffect(() => {
        if (image) {
            setPicture("http://localhost:8000/pet/pet-image/" + image.split('/').pop());
        }

    }, [image, picture])

    return (
        <div className="pet-grid-item" >
        {name ? (
                <Link to={link} className="pet">
                    <img className="petImage" src={picture}/>
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