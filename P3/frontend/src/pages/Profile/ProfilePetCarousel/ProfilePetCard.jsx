import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultPet from '../../../assets/images/default-pet.png'

const ProfilePetCard = ({ id, name, image }) => {
    const detailLink = "/pets/" + String(id);
    // Fetch pet picture.
    const [picture, setPicture] = React.useState(DefaultPet);
    React.useEffect(() => {
        if (image) {
            setPicture("https://petpal-production.up.railway.app/pet/pet-image/" + image.split('/').pop());
        }

    }, [image, picture])

    return (
        <div className="pet-grid-item" >
        {name ? (
                <Link to={detailLink} className="pet">
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