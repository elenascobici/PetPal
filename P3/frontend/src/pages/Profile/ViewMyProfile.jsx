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
    let messageStated = false;

    // Fetch user data to display on their profile.
    const fetchProfileData = () => {
        fetch(`http://localhost:8000/accounts/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
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

    const listenForDeleteAccount = () => {
        if (!messageStated && window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            fetch(`http://localhost:8000/accounts/profile/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                })
                .then(response => {
                    if (response.ok) {
                        localStorage.clear();
                        window.location.href = "http://localhost:3000/";
                        if (!messageStated) {
                            alert("Your account has been deleted.");
                            messageStated = true;
                        }
                    }
                    else {
                        if (!messageStated) {
                            alert("Error with account deletion.");
                            messageStated = true;
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
            });
        }
        else {
            messageStated = false;
        }
    }

    // Fetch profile data and listen for account deletion on load.
    React.useEffect(() => {
        fetchProfileData();
    }, [])

    // Send a request to update this profile.
    const updateProfile = (updateData) => {
        // Don't set the password to nothing if it hasn't been
        // updated.
        if (updateData.password === "") {
            delete updateData.password;
        }
        console.log(JSON.stringify(updateData));
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
                }
                else if (response.status === 400) {
                    response.json()
                    .then(data => {
                        setEditProfileErrors(data);
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }
    

    return (
        <>
        {userData && (user_type === "Seeker" ? 
            <ViewMyProfileSeeker userData={userData} errors={editProfileErrors} updateProfile={(formData) => updateProfile(formData)}></ViewMyProfileSeeker> 
                : 
            <ViewMyProfileShelter userData={userData} errors={editProfileErrors} updateProfile={(formData) => updateProfile(formData)}></ViewMyProfileShelter> 
        )}
        <button id="delete-account-button" onClick={listenForDeleteAccount}>Delete Account</button>
        </>
    )
}