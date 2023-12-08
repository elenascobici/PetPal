/**
 * Helper method that takes in a username and unencrypted password and 
 * logs the corresponding user in.
 */

import axios from "axios";

const logInFetchCall = (username, password, setErrorMessages) => {
    localStorage.clear();
    fetch('http://localhost:8000/accounts/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
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
                setErrorMessages(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default logInFetchCall;