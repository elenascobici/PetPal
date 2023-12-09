import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePetCard from './ProfilePetCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePetGrid = ({ pets }) => {
    return (
        <div className="pet-grid">
            {pets.map((pet) => (
                <ProfilePetCard key={pet.id} name={pet.name} image={pet.pet_image_1} />
            ))}
            {Array.from({ length: Math.max(8 - pets.length, 0) }).map((_, index) => (
                <ProfilePetCard key={index} />
            ))}
        </div>
        
    )
}

export default ProfilePetGrid;