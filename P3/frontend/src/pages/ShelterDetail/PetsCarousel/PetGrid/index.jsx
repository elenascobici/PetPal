import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import DefaultPet from "../../../../assets/images/default-pet.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function get_image_url(image) {
    if (image && typeof image === 'string') {
        const img = "http://localhost:8000/pet/pet-image/" + image.split('/').pop();
        console.log(img);
        return img;
    }
    return DefaultPet;
}

function get_pet_link(pet_id) {
    return `/pets/${pet_id}`;
}

const PetGrid = ({ pets }) => {
    console.log("GRID", pets);
    return (
        <div className="pet-grid">
            {pets.map((pet) => (
                <PetCard key={pet.id} name={pet.name} image={get_image_url(pet.pet_image_1)} link={get_pet_link(pet.id)}  />
            ))}
            {Array.from({ length: Math.max(8 - pets.length, 0) }).map((_, index) => (
                <PetCard key={index} />
            ))}
        </div>
    );
};

export default PetGrid;