import React, { useEffect, useState } from 'react';
import ShelterOrgCard from "./ShelterOrgCard";
import StrayCatRelief from "../../../assets/images/straycatshelter.png"
import JustPaws from "../../../assets/images/justpawsshelter.jpg"
import HeartHome from "../../../assets/images/hearthomeshelter.png"
import PetHouse from "../../../assets/images/pethouseshelter.png"
import ForgottenOnes from "../../../assets/images/forgottenonesshelter.png"
import AnimalShelter from "../../../assets/images/animalshelter.jpg"
import PawPatrol from "../../../assets/images/pawpatrol.png"


const ShelterOrgs = () => {
    const [shelters, setShelters] = useState([]);
    const dummyShelters = [
        {
            "username": "straycatrelief",
            "name": "Stray Cat Relief",
            "profile_picture": StrayCatRelief,
        },
        {
            "username": "justpawsanimalrescue",
            "name": "Just Paws Animal Rescue",
            "profile_picture": JustPaws,
        },
        {
            "username": "heartandhome",
            "name": "Heart and Home",
            "profile_picture": HeartHome,
        },
        {
            "username": "pethouse",
            "name": "Pet House",
            "profile_picture": PetHouse,
        },
        {
            "username": "forgottenonescatrescue",
            "name": "Forgotten Ones Cat Rescue",
            "profile_picture": ForgottenOnes,
        },
        {
            "username": "animalshelter",
            "name": "Animal Shelter",
            "profile_picture": AnimalShelter,
        },
        {
            "username": "pawpatrol",
            "name": "Paw Patrol",
            "profile_picture": PawPatrol,
        },
    ];

    useEffect(() => {
        fetch('http://localhost:8000/accounts/shelter-list')
        .then(response => {
            if (!response.ok) {
                setShelters(dummyShelters);
                return;
            }
        })
        .then(json => {
            setShelters(json.data.slice(0, 7));
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setShelters(dummyShelters);
        })
    }, []);


    return (
        <div id="shelters">
            {shelters.map(shelter => {
                return (
                    <ShelterOrgCard
                      key={shelter.username}
                      name={shelter.name}
                      link={shelter.link || "/sign-up"}
                      image={shelter.profile_picture}
                    />
                  );
            })}
        </div>
    )
}

export default ShelterOrgs;