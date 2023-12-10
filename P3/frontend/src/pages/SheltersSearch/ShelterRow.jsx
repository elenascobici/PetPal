import {useState, useEffect} from "react";

const ShelterRow = ({shelter}) => {
    const mailTo = "mailto:" + shelter.email;
    // const [shelterInfo, setInfo] = useState({});

    // const fetchProfileData = () => {
    //     const token = localStorage.getItem('access_token');
    //     fetch(`http://localhost:8000/accounts/profile/${shelter.id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         })
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then(data => {
    //             setInfo(data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //     });
    // }

    // useEffect(() => {
    //     fetchProfileData();
    // }, []);

    return (
        <>
        <div class="grid-item grid-item-shelter shelterLink">
        <p class="shelterLink">{shelter.name}</p>
        </div>
        <div class="grid-item grid-item-shelter">{(shelter.street? shelter.street: '') + ' ' + (shelter.city ? shelter.city: '' + ' ') + shelter.province}</div>
        <div class="grid-item grid-item-shelter">
        <a class="email-shelter" href={mailTo}>{shelter.email}</a> 
        </div>
        </>
    )
}

export default ShelterRow;