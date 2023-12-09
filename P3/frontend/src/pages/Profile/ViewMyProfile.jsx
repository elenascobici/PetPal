import React from "react";
import axios from "axios";
import { ViewMyProfileSeeker } from "./ViewMyProfileSeeker";
import { ViewMyProfileShelter } from "./ViewMyProfileShelter";

export const ViewMyProfile = () => {
    const [userData, setUserData] = React.useState({});
    const [editProfileErrors, setEditProfileErrors] = React.useState({});
    const token = localStorage.getItem('access_token'); 
    const userId = localStorage.getItem('id'); 
    const user_type = localStorage.getItem('user_type'); 

    // Fetch user data to display on their profile.
    const fetchProfileData = () => {
        fetch(`http://localhost:8000/accounts/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

    // Fetch profile data on load.
    React.useEffect(() => {
        fetchProfileData();
    }, [])

    // Send a request to update this profile.
    const updateProfile = (updateData) => {
        console.log("Update data " + JSON.stringify(updateData));
        fetch(`http://localhost:8000/accounts/profile/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: updateData,
            })
            .then(response => {
                if (response.ok) {
                    fetchProfileData(); // Update profile with changes.
                    response.json().then((data) => console.log(data));
                }
                else if (response.status === 400) {
                    response.json()
                    .then(data => {
                        setEditProfileErrors(data);
                        console.log(data);
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }
    

    return (
        userData && (user_type === "Seeker" ? 
            <ViewMyProfileSeeker userData={userData} errors={editProfileErrors} updateProfile={(formData) => updateProfile(formData)}></ViewMyProfileSeeker> 
                : 
            <ViewMyProfileShelter userData={userData} errors={editProfileErrors} updateProfile={(formData) => updateProfile(formData)}></ViewMyProfileShelter> 
        )
    )
}