import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PetImageCard from "./PetImageCard";
import Buddy from "../../../assets/images/buddy.jpg";
import Quokkie from "../../../assets/images/quokkie.png";
import Calcifer from "../../../assets/images/calcifer.jpg";
import HokeyPokey from "../../../assets/images/hokey-pokey.jpg";
import DefaultPet from "../../../assets/images/default-pet.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const PetImages = ( {userType, userId } ) => {
    const filter = userType === "Seeker" ? "?status=available" : "";
    const containerText = userType === "Shelter" ? "View pet listings" : "Meet more future friends";
    const [pets, setPets] = useState([]);
    const [dummy, setDummy] = useState(true);
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
            "name": "Hokey Pokey",
            "pet_image_1": HokeyPokey
        },

    ];
    const get_image_url = (image) => {
        if (dummy) {
            return image;
        }
        if (image && typeof image === 'string') {
            const img = "https://petpal-production.up.railway.app/pet/pet-image/" + image.split('/').pop();
            console.log(img);
            return img;
        }
        return DefaultPet;
    }

    
    const get_pet_link = (pet_id) => {
        return `/pets/${pet_id}`;
    }



    useEffect(() => {
        const fetchPets = async () => {
            try {
                const token = localStorage.getItem('access_token'); 
                const response = await fetch(`https://petpal-production.up.railway.app/pet/search/?search=&${filter}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                    });
                if (!response.ok) {
                    console.log("RESPONSE NOTOK")
                    setPets(dummyPets);
                    return;
                }
                const data = await response.json();
                const filteredPets = data.results.filter(pet => pet.pet_image_1);
                if (filteredPets.length > 0) {
                    setPets(filteredPets.slice(0, 4));
                    setDummy(false);
                } else {
                    setPets(dummyPets);
                    setDummy(true);
                }
                
            } catch (error) {
                setPets(dummyPets);
                setDummy(true);
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
                      link={get_pet_link(pet.id) || "/404"}
                      image={get_image_url(pet.pet_image_1)}
                    />
                  );
            })}
            
          <div className="col text-center d-flex justify-content-center">
            <Link to={`${userType ? userType.toLowerCase() : ""}/search`} id="morePets" class="pet">
                <div id="morePetsText">{containerText}</div> 
              <div id="arrow">{'>'}</div>
            </Link>
          </div>
        </div>
    )
}

export default PetImages;