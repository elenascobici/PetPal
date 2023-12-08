import React from "react";
import axios from "axios";
import { ViewMyProfileSeeker } from "./ViewMyProfileSeeker";

export const ViewMyProfile = () => {
    const [userData, setUserData] = React.useState({})

    // Fetch user data to display on their profile on load.
    React.useEffect(() => {
        const token = localStorage.getItem('access_token'); 
        const userId = localStorage.getItem('id'); 

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
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }, [])
    

    return (
        userData && <ViewMyProfileSeeker userData={userData}></ViewMyProfileSeeker>
    )
}