import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PetImageCard from "./PetImageCard";
import Buddy from "../../../assets/images/buddy.jpg";
import Quokkie from "../../../assets/images/quokkie.png";
import Calcifer from "../../../assets/images/calcifer.jpg";
import HokeyPokey from "../../../assets/images/hokey-pokey.jpg";

const PetImages = ( {userType, userId } ) => {
    const filter = userType === "Seeker" ? "?status=available" : "";
    const containerText = userType === "Shelter" ? "View pet listings" : "Meet more future friends";
    const [pets, setPets] = useState([]);
    const dummyPets = [
        {
            "id": 2,
            "name": "Buddy",
            "pet_image_1": Buddy
        },
        {
            "id": 3,
            "name": "Quokkie",
            "pet_image_1": Quokkie
        },
        {
            "id": 1,
            "name": "Calcifer",
            "pet_image_1": Calcifer
        },
        {
            "id": 10,
            "name": "Hokey Pokey1",
            "pet_image_1": HokeyPokey
        },

    ];

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const token = localStorage.getItem('access_token'); 
                const response = await fetch(`http://localhost:8000/pet/search${filter}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                    });
                if (!response.ok) {
                    setPets(dummyPets);
                    return;
                }
                const data = await response.json();
                const filteredPets = data.results.filter(pet => pet.pet_image_1 && pet.pet_image_1 !== "http://localhost:8000/media/http%3A/127.0.0.1%3A8000/media/pets/IMG-2805_eTxDIx6.jpg");
                if (filteredPets.length > 0) {
                    setPets(filteredPets.slice(0, 4));
                } else {
                    setPets(dummyPets);
                }
                
            } catch (error) {
                setPets(dummyPets);
            }
        };

        if (userType && userId) {
            fetchPets();
        } else {
            setPets(dummyPets);
        }
    }, [userType, userId]);
    

    console.log(pets);

    return (
        <div className="row align-middle">
            {pets.map(pet => {
                return (
                    <PetImageCard
                      key={pet.id}
                      name={pet.name}
                      link={pet.link || "/sign-up"}
                      image={pet.pet_image_1}
                    />
                  );
            })}
            
          <div className="col text-center d-flex justify-content-center">
            <Link to="/search" id="morePets" class="pet">
                <div id="morePetsText">{containerText}</div> 
              <div id="arrow">{'>'}</div>
            </Link>
          </div>
        </div>
    )
}

export default PetImages;