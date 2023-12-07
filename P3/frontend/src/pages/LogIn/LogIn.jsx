import axios from "axios";
import {useState} from "react";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const submit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({username: username, password: password}));

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
                localStorage.clear();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                axios.defaults.headers.common['Authorization'] = 
                                                `Bearer ${data['access']}`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div class="page-container">
            <div class="main">
            <div id="login-container">
                <div id="welcome-back-container">
                <p>Welcome</p>
                <p>Back!</p>
                <div id="puppy-waving-img-container">
                    <img id="puppy-waving-img" src="images/puppy-waving.jpg"/>
                </div>
                </div>
                <div id="log-in-info-container">
                <p>Log In</p>
                <form>
                    <input class="text-input" type="text" 
                        value={username} name="username" 
                        placeholder="username" 
                        onChange={e => setUsername(e.target.value)} 
                        required/>
                    <br/>
                    <input class="text-input" type="password"
                        value={password} name="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                        required/>
                    <br/>
                    <button id="log-in-btn" class="yellowButton" onClick={submit}>Log In</button>
                </form>
                <a class="account-links" href="sign-up.html">Don't have an account? Sign up now!</a>
                </div>
            </div>
            </div>
        </div>
    )
}
