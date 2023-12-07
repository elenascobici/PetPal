import React from "react";
import "../SignUpSeeker/style.css"
import SignUpAnimals from "../../assets/images/sign-up-animals.jpg"

function SignUpShelter() {
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
            <p>Create a <b>Pet Shelter</b> Account</p>
            <form method="post" action="home-shelter.html">
                <input class="text-input" type="text" name="username" placeholder="username" required />
                <br />
                <input class="text-input" type="email" name="email" placeholder="email address" required />
                <br />
                <input class="text-input" type="password" name="password" placeholder="password" required />
                <br />
                <input class="text-input" type="password" placeholder="confirm password" required />
                <br />
                <button id="log-in-btn" class="yellowButton" type="submit">Sign Up</button>
            </form>
            <a class="account-links" href="log-in.html">Already have an account? Sign in now!</a>
            </div>
        </div>
        </div>
    </div>
    )
}

export default SignUpShelter;