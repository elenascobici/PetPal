import React from "react";
import "./style.css";
import SignUpAnimals from "../../assets/images/sign-up-animals.jpg"

function SignUpSeeker() {
    const validateForm = (e) => {
        e.preventDefault(); // Don't refresh
        var formData = Object.fromEntries(new FormData(document.querySelector('#sign-up-seeker-form')).entries());
        fetch("http://localhost:8000/accounts/seeker/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
            .then((data) => {
                console.log(data);
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
                <p>Create a <b>Pet Seeker</b> Account</p>
                <form id="sign-up-seeker-form">
                    <input class="text-input" type="text" name="firstname" placeholder="first name" required />
                    <input class="text-input" type="text" name="lastname" placeholder="last name" required />
                    <input class="text-input" type="text" name="username" placeholder="username" required />
                    <input class="text-input" type="email" name="email" placeholder="email address" required />
                    <input class="text-input" type="password" name="password1" placeholder="password" required />
                    <input class="text-input" type="password" placeholder="confirm password" name="password2" required />
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