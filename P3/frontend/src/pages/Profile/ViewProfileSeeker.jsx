import React from "react";
import axios from "axios";
import "./style.css";

export const ViewProfileSeeker = (profileId) => {
    // Fetch user data to display on their profile.
    fetch('http://localhost:8000/accounts/profile/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('user_type', data.user_type);
                localStorage.setItem('id', data.id);
                axios.defaults.headers.common['Authorization'] = 
                                                `Bearer ${data['access']}`;
                window.location.href = "http://localhost:3000/";
            }
            else {
            }
        })
        .catch(error => {
            console.error('Error:', error);
    });

    return (
        <></>
    )
}