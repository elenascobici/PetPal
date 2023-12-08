import React from "react";
import "../SignUpSeeker/style.css";
import SignUpAnimals from "../../assets/images/sign-up-animals.jpg"
import logInFetchCall from "../LogIn/LogInFetchCall";

function SignUpSeeker() {
    const validateForm = (e) => {
        e.preventDefault(); // Don't refresh

        // Clear all error messages initially
        document.querySelectorAll(".text-input-error-message").forEach((errorMessageInput) => {
            errorMessageInput.innerHTML = "";
        })

        var formData = Object.fromEntries(new FormData(document.querySelector('#sign-up-shelter-form')).entries());
        fetch("http://localhost:8000/accounts/shelter/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(response => {
            if (!response.ok) {
                response.json().then((data) => {
                    const dataMap = Object.entries(data);
                    for (let [key, value] of dataMap) {
                        console.log(key);
                        document.getElementById(key + "-error").innerHTML = value;
                    }
                })
            } else {
                logInFetchCall(formData.username, formData.password1);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div class="page-container">
            <div class="main">
            <div id="login-container">
                <div id="welcome-back-container">
                <p>Welcome</p>
                <p>to PetPal!</p>
                <div id="pets-img-container">
                    <img id="pets-img" src={SignUpAnimals} />
                </div>
                </div>
                <div id="log-in-info-container">
                <p class="create-a-pet">Create a <b>Pet Shelter</b> Account</p>
                <form id="sign-up-shelter-form">
                    <input class="text-input" type="text" name="username" placeholder="username" required />
                    <p class="text-input-error-message" id="username-error"></p>
                    <input class="text-input" type="text" name="name" placeholder="name" required />
                    <p class="text-input-error-message" id="name-error"></p>
                    <input class="text-input" type="email" name="email" placeholder="email address" required />
                    <p class="text-input-error-message" id="email-error"></p>
                    <input class="text-input" type="password" name="password1" placeholder="password" required />
                    <p class="text-input-error-message" id="password1-error"></p>
                    <input class="text-input" type="password" placeholder="confirm password" name="password2" required />
                    <p class="text-input-error-message" id="password2-error"></p>
                    <br />
                    <button id="log-in-btn" class="yellowButton" onClick={validateForm}>Sign Up</button>
                </form>
                <a class="account-links" href="log-in.html">Already have an account? Sign in now!</a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignUpSeeker;