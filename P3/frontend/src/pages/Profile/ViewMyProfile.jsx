import React from "react";
import axios from "axios";
import { ViewMyProfileSeeker } from "./ViewMyProfileSeeker";

export const ViewMyProfile = () => {
    const [userData, setUserData] = React.useState({});
    const [editProfileErrors, setEditProfileErrors] = React.useState({});
    const token = localStorage.getItem('access_token'); 
    const userId = localStorage.getItem('id'); 

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
        fetch(`http://localhost:8000/accounts/profile/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data',
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
        userData && <ViewMyProfileSeeker userData={userData} errors={editProfileErrors} updateProfile={(formData) => updateProfile(formData)}></ViewMyProfileSeeker>
    )
}