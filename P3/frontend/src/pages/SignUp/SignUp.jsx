import React from "react";
import "./style.css";
import PetSeekerImage from "../../assets/images/pet-seeker-image.jpg"
import PetShelterImage from "../../assets/images/pet-shelter-image.jpg"

function SignUp() {
    return (
        <div class="page-container">
            <div class="main">
            <div id="sign-up-container">
                <p id="sign-up-text">What kind of acount would you like to create?</p>
                <div id="options-container">
                <a class="account-option-link" href="/sign-up-seeker">
                    <div class="account-option" id="pet-seeker-option">
                    <p class="pet-option-text" id="pet-seeker-text">Pet Seeker</p>
                    <div class="sign-up-image-container" id="pet-seeker-image-container">
                        <img class="sign-up-image" id="pet-seeker-image" src={PetSeekerImage} />
                    </div>
                    </div> 
                </a>
                <a class="account-option-link" href="/sign-up-shelter">
                    <div class="account-option" id="pet-shelter-option">              
                    <p class="pet-option-text" id="pet-shelter-text">Pet Shelter</p>
                    <div class="sign-up-image-container" id="pet-shelter-image-container">
                        <img class="sign-up-image" id="pet-shelter-image" src={PetShelterImage} />
                    </div>
                    </div>
                </a>
                </div>
                <a class="account-links" href="http://localhost:3000/log-in">Already have an account? Sign in now!</a>
            </div>
            </div>
        </div>
    )
}

export default SignUp;