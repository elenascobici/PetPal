import React from "react";
// import "./style.css";

function SignUp() {
    return (
        <html lang="en">
            <body>
            <div class="page-container">
                <div class="main">
                <div id="sign-up-container">
                    <p id="sign-up-text">What kind of acount would you like to create?</p>
                    <div id="options-container">
                    <a class="account-option-link" href="sign-up-seeker.html">
                        <div class="account-option" id="pet-seeker-option">
                        <p class="pet-option-text" id="pet-seeker-text">Pet Seeker</p>
                        <div class="sign-up-image-container" id="pet-seeker-image-container">
                            <img class="sign-up-image" id="pet-seeker-image" src="images/pet-seeker-image.jpg" />
                        </div>
                        </div> 
                    </a>
                    <a class="account-option-link" href="sign-up-shelter.html">
                        <div class="account-option" id="pet-shelter-option">              
                        <p class="pet-option-text" id="pet-shelter-text">Pet Shelter</p>
                        <div class="sign-up-image-container" id="pet-shelter-image-container">
                            <img class="sign-up-image" id="pet-shelter-image" src="images/pet-shelter-image.jpg" />
                        </div>
                        </div>
                    </a>
                    </div>
                    <a class="account-links" href="log-in.html">Already have an account? Sign in now!</a>
                </div>
                </div>
            </div>
            </body>
        </html>
        )
}

export default SignUp;