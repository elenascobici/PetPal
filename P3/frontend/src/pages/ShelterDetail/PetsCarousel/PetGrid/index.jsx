import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetGrid = ({ pets }) => {
    console.log("GRID", pets);
    return (
        <div className="pet-grid">
            {pets.map((pet) => (
                <PetCard key={pet.id} name={pet.name} image={pet.pet_image_1} />
            ))}
            {Array.from({ length: Math.max(8 - pets.length, 0) }).map((_, index) => (
                <PetCard key={index} />
            ))}
        </div>
    );
};

export default PetGrid;