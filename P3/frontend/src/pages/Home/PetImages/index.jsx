import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PetImageCard from "./PetImageCard";
import Buddy from "../../../assets/images/buddy.jpg";
import Quokkie from "../../../assets/images/quokkie.png";
import Calcifer from "../../../assets/images/calcifer.jpg";
import HokeyPokey from "../../../assets/images/hokey-pokey.jpg";

const PetImages = () => {
    const dummyCurrUser = { };
    const currentUser = dummyCurrUser;
    const filter = currentUser.type === "seeker" ? "?status=available" : "";
    const containerText = currentUser.type === "shelter" ? "View pet listings" : "Meet more future friends";
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
            "name": "Hokey Pokey",
            "pet_image_1": HokeyPokey
        },

    ];
    // const pets = dummyPets;
    // CAN DO A CHECK IF USER IS SIGNED IN INSTEAD OF FETCHING AND GETTING AN ERROR
    useEffect(() => {
        fetch(`http://localhost:8000/pet/search${filter}`)
        .then(response => {
            if (!response.ok) {
                setPets(dummyPets);
                return;
            }
            return response.json();
        })
        .then(json => {
            setPets(json.data.results.slice(0, 4));
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setPets(dummyPets);
        });
    }, []);

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