import React, { useEffect, useState } from 'react';
import ShelterOrgCard from "./ShelterOrgCard";
import StrayCatRelief from "../../../assets/images/straycatshelter.png"
import JustPaws from "../../../assets/images/justpawsshelter.jpg"
import HeartHome from "../../../assets/images/hearthomeshelter.png"
import PetHouse from "../../../assets/images/pethouseshelter.png"
import ForgottenOnes from "../../../assets/images/forgottenonesshelter.png"
import AnimalShelter from "../../../assets/images/animalshelter.jpg"
import PawPatrol from "../../../assets/images/pawpatrol.png"


const ShelterOrgs = ( {userType, userId } ) => {
    const [shelters, setShelters] = useState([]);
    const [dummy, setDummy] = useState(true);
    const dummyShelters = [
        {
            "username": "straycatrelief",
            "name": "Stray Cat Relief",
            "profile_picture": StrayCatRelief,
            "id": 8,
        },
        {
            "username": "justpawsanimalrescue",
            "name": "Just Paws Animal Rescue",
            "profile_picture": JustPaws,
            "id": 9,
        },
        {
            "username": "heartandhome",
            "name": "Heart and Home",
            "profile_picture": HeartHome,
            "id": 10,
        },
        {
            "username": "pethouse",
            "name": "Pet House",
            "profile_picture": PetHouse,
            "id": 11,
        },
        {
            "username": "forgottenonescatrescue",
            "name": "Forgotten Ones Cat Rescue",
            "profile_picture": ForgottenOnes,
            "id": 12,
        },
        {
            "username": "animalshelter",
            "name": "Animal Shelter",
            "profile_picture": AnimalShelter,
            "id": 13,
        },
        {
            "username": "pawpatrol",
            "name": "Paw Patrol Rescue",
            "profile_picture": PawPatrol,
            "id": 7,
        },
    ];

    const get_image_url = (image) => {
        if (dummy) {
            return image;
        }
        if (image && typeof image === 'string') {
            const img = "https://petpal-production.up.railway.app/accounts/profile-picture/" + image.split('/').pop();
            return img;
        }
        return
    }

    
    const get_shelter_link = (shelter_id, shelter_name) => {
        return `/shelter/${shelter_id}/${encodeURI(shelter_name)}`;
    }

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                console.log("Fetching shelters");
                const token = localStorage.getItem('access_token'); 
                const response = await fetch('https://petpal-production.up.railway.app/accounts/shelter-list?search', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                    });
                if (!response.ok) {
                    setShelters(dummyShelters);
                    setDummy(true);
                    return;
                }
                const data = await response.json();
                console.log("DATA", data)
                const filteredShelters = data.results.filter(shelter => shelter.profile_picture && shelter.profile_picture !== "https://petpal-production.up.railway.app/media/accounts/default_profile.jpg");
                if (filteredShelters.length > 0) {
                    setShelters(filteredShelters.slice(0, 7));
                    setDummy(false);
                } else {
                    setShelters(dummyShelters);
                    setDummy(true);
                }
            } catch (error) {
                console.log(error);
                setShelters(dummyShelters);
                setDummy(true);
            }
        };

        if (userType && userId) {
            fetchShelters();
        } else {
            setShelters(dummyShelters);
        }
    }, [userType, userId]);



    return (
        <div id="shelters">
            {shelters.map(shelter => {
                return (
                    <ShelterOrgCard
                      key={shelter.username}
                      name={shelter.name}
                      link={get_shelter_link(shelter.id, shelter.name) || "/404"}
                      image={get_image_url(shelter.profile_picture)}
                    />
                  );
            })}
        </div>
    )
}

export default ShelterOrgs;