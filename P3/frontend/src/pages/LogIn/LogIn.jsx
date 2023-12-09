import {useState} from "react";
import "./style.css"
import PuppyWavingImage from "../../assets/images/puppy-waving.jpg"
import logInFetchCall from "./LogInFetchCall";
import axios from "axios";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const submit = (e) => {
        e.preventDefault();
        logInFetchCall(username, password, setErrorMessages);
    }

    const setErrorMessages = (errors) => {
        // Clear all error messages initially
        document.querySelectorAll(".text-input-error-message").forEach((errorMessageInput) => {
            errorMessageInput.innerHTML = "";
        })
        
        const dataMap = Object.entries(errors);
        for (let [key, value] of dataMap) {
            let errorElement = document.getElementById(key + "-error");
            if (!errorElement) {
                errorElement = document.getElementById("username-error");
            }
            errorElement.innerHTML = value;
        }
    }

    return (
        <div class="page-container">
            <div class="main">
            <div id="login-container">
                <div id="welcome-back-container">
                <p>Welcome</p>
                <p>Back!</p>
                <div id="puppy-waving-img-container">
                    <img id="puppy-waving-img" src={PuppyWavingImage}/>
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
                    <p class="text-input-error-message" id="username-error"></p>
                    <input class="text-input" type="password"
                        value={password} name="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                        required/>
                    <p class="text-input-error-message" id="password-error"></p>
                    <button id="log-in-btn" class="yellowButton" onClick={submit}>Log In</button>
                </form>
                <a class="account-links" href="http://localhost:3000/sign-up">Don't have an account? Sign up now!</a>
                </div>
            </div>
            </div>
        </div>
    )
}
