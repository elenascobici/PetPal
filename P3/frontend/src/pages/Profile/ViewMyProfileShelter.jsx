import React from "react"
import DefaultProfilePicture from "../../assets/images/user.png"
import "./style.css"
import ProfilePetsCarousel from "./ProfilePetCarousel/ProfilePetCarousel"
import Blogs from "./Blogs"

export const ViewMyProfileShelter = ({userData, errors, updateProfile}) => {
    const [profilePath, setProfilePath] = React.useState(DefaultProfilePicture);
    React.useEffect(() => {
        // Clear all error messages initially
        document.querySelectorAll(".text-input-error-message").forEach((errorMessageInput) => {
            errorMessageInput.innerHTML = "";
        })
        const errorMap = Object.entries(errors);
        for (let [key, value] of errorMap) {
            const errorElement = document.getElementById(key + "-error");
            if (errorElement) {
                errorElement.innerHTML = value;
            }
        }
    }, [errors])

    React.useEffect(() => {
        // Event listener for save button.
        document.getElementById("save-button").onclick = (e) => 
            {
                e.preventDefault();
                updateProfile(new FormData(document.getElementById("update-shelter-profile-form")));
            }
    }, [])

    React.useEffect(() => {
        // Fetch profile picture.
        if (userData.profile_picture) {
            setProfilePath("http://localhost:8000/accounts/profile-picture/" + userData.profile_picture.split('/').pop());
        }

        // Set province.
        document.getElementById("province-select").value = userData.province;
    }, [userData])

    const handleImageUpload = (e) => {
        setProfilePath(URL.createObjectURL(e.target.files[0]));
    }

    // <div class="selectStatus">
    //     <select name="buddyStatus" class="status">
    //     <option class="statusOption available" value="available" selected>Available</option>
    //     <option class="statusOption pending" value="pending">Pending</option>
    //     <option class="statusOption adopted" value="adopted">Adopted</option>
    //     <option class="statusOption withdrawn" value="withdrawn">Withdrawn</option>
    //     </select>
    // </div>

    return (
        <div class="page-container">
            <div class="main" id="update-page">
            <div id="title-pfp">Update Shelter Details</div>
            <form action="" method="post" id="update-shelter-profile-form">
            <div class="container gx-0" id="shelterLogoEdit">
                <div className="form-control" id="profile-form">
                    <img id="profileImage" src={profilePath} />
                    <label class="form-label btn" for="profile_picture" id="edit">Change shelter logo</label>
                    <input id="profile_picture" type="file" 
                        name="profile_picture" placeholder="Photo" capture onChange={handleImageUpload}/>
                    <p class="text-input-error-message" id="profile_picture-error"></p>
                </div>
            </div>
                <div class="grid grid-profile">
                <div class="grid-item">
                    <label for="name" id="shelterNameLabel" class="gridLabel">Shelter Name</label>
                </div>
                <div class="grid-item">
                    <textarea id="name" rows = "1" type="text" name="name" class="gridValue" required defaultValue={userData.name}></textarea>
                    <p class="text-input-error-message" id="name-error"></p>
                </div>
                <div class="grid-item">
                    <label for="password" id="passwordLabel" class="gridLabel">Password</label>
                </div>
                <div class="grid-item">
                    <input id="password" type="password" name="password" class="gridValue" defaultValue="" />
                    <p class="text-input-error-message" id="password-error"></p>
                </div>
                <div class="grid-item">
                    <label for="emailAddress" id="emailLabel" class="gridLabel">Email Address</label>
                </div>
                <div class="grid-item">
                    <textarea id="email" rows = "1" type="text" name="email" class="gridValue" defaultValue={userData.email} required></textarea>
                    <p class="text-input-error-message" id="email-error"></p>
                </div>
                <div class="grid-item">
                    <label for="phoneNumber" id="phoneNumberLabel" class="gridLabel">Phone Number</label>
                </div>
                <div class="grid-item">
                    <input id="phone" type="tel" name="phone" class="gridValue" required
                    defaultValue={userData.phone} size="10" />
                    <p class="text-input-error-message" id="phone-error"></p>
                </div>
                <div class="grid-item">
                    <label for="location" id="locationLabel" class="gridLabel">Location</label>
                </div>
                <div class="grid-item">
                    <textarea id="location" rows = "1" type="text" name="street" class="gridValue street" defaultValue={userData.street}></textarea>
                    <p class="locationType">Street</p>
                    <textarea rows = "1" type="text" name="city" class="gridValue city" defaultValue={userData.city} required></textarea>
                    <p class="locationType">City</p>
                    <select name="province" class="gridValue" id="province-select" defaultValue={userData.province ? userData.province : null} required>
                        <option value={null} hidden></option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Quebec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon">Yukon</option>
                    </select>
                    <p class="text-input-error-message" id="province-error"></p>
                    <p class="locationType" id="provinceLabel">Province/Territory</p>
                </div>
                <div class="grid-item">
                    <label for="websiteLink" id="websiteLinkLabel" class="gridLabel">Website Link</label>
                </div>
                <div class="grid-item">
                    <input id="websiteLink" type="text" name="website_link" class="gridValue"
                    defaultValue={userData.website_link} />
                </div>
                <div class="grid-item">
                    <div class="gridLabel">Preferred Contact</div>
                </div>
                <div class="grid-item" id="radioButtons">
                <div className="row">
                <div className="col-12">
                    <input id="phonePreferred" type="radio" name="preferred_contact" value="phone" checked={userData.preferred_contact === "phone"} />
                    <span class="checkmark"></span>
                    <label for="phonePreferred" class="contactOptions">Phone</label>
                </div>
                <div className="col-12">
                    <input id="emailPreferred" type="radio" name="preferred_contact" value="email"  checked={userData.preferred_contact === "email"}  />
                    <span class="checkmark"></span>
                    <label for="emailPreferred" class="contactOptions">Email</label>
                </div>
                </div>
                    
                </div>
                </div>
                <div class="container justify-content-start text-start">
                <h2 class="subtitle">Mission Statement:</h2>
                <div id="mission">
                <textarea rows = "8" type="text" name="mission_statement" class="gridValue" id="missionBox" defaultValue={userData.mission_statement}></textarea>  
                </div>        
                </div>
                <div class="container justify-content-start text-start">
                <h2 class="subtitle" id="listPets">List of Pets:</h2>
                </div>
                {userData && <ProfilePetsCarousel shelterId={localStorage.getItem("id")} shelterName={userData.name}></ProfilePetsCarousel>}
                <button type="submit" class="editButton" id="save-button">Save</button>
                </form>
                <Blogs />
            </div>
            
            <div class="buttons">
                <a class="editButton" href="/blog-create">Create a blog ⏵</a>
                <a href="pet-creation.html" class="editButton" id="create-pet-button">
                Create new pets ⏵
                </a>
        </div>
        </div>
    )
}