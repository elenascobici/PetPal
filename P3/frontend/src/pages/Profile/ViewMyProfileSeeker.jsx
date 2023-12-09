import React from "react"
import DefaultProfilePicture from "../../assets/images/user.png"
import "./style.css"

export const ViewMyProfileSeeker = ({userData, errors, updateProfile}) => {
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
                updateProfile(new FormData(document.getElementById("update-seeker-profile-form")));
            }
    }, [])

    // Fetch profile picture.
    React.useEffect(() => {
        if (userData.profile_picture) {
            setProfilePath("http://localhost:8000/accounts/profile-picture/" + userData.profile_picture.split('/').pop());
        }

        // Set province.
        document.getElementById("province-select").value = userData.province;
    }, [userData])

    const handleImageUpload = (e) => {
        setProfilePath(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div class="page-container">
        <div class="main" id="update-page">
        <div id="title">Update My Account</div>
        <form action="" method="post" id="update-seeker-profile-form">
            <div class="container gx-0" id="userEdit">
            <div class="form-control" id="profile">
                <img id="profileImage" src={profilePath} />
                <label class="form-label btn" for="imageUpload" id="edit">Change profile picture</label>
                <input id="imageUpload" type="file" 
                    name="profile_picture" placeholder="Photo" defaultValue="" capture onChange={handleImageUpload}/>
                <p class="text-input-error-message" id="profile_picture-error"></p>
            </div>
            </div>

            <div class="grid">
            <div class="grid-item">
                <label for="firstName" id="firstNameLabel" class="gridLabel">First name</label>
            </div>
            <div class="grid-item">
                <input id="firstName" type="text" name="first_name" class="gridValue" defaultValue={userData.first_name} required/>
                <p class="text-input-error-message" id="first_name-error"></p>
            </div>
            <div class="grid-item">
                <label for="lastName" id="lastNameLabel" class="gridLabel">Last name</label>
            </div>
            <div class="grid-item">
                <input id="lastName" type="text" name="last_name" class="gridValue" defaultValue={userData.last_name} required/>
                <p class="text-input-error-message" id="last_name-error"></p>
            </div>
            <div class="grid-item">
                <label for="username" id="usernameLabel" class="gridLabel">Username</label>
            </div>
            <div class="grid-item">
                <input id="username" type="text" name="username" class="gridValue" readOnly value={userData.username}/>
                <p class="text-input-error-message" id="username-error"></p>
            </div>
            <div class="grid-item">
                <label for="password" id="passwordLabel" class="gridLabel">Password</label>
            </div>
            <div class="grid-item">
                <input id="password" type="password" name="password" class="gridValue" defaultValue=""/>
                <p class="text-input-error-message" id="password-error"></p>
            </div>
            <div class="grid-item">
                <label for="emailAddress" id="emailLabel" class="gridLabel">Email Address</label>
            </div>
            <div class="grid-item">
                <textarea id="emailAddress" rows = "1" type="text" name="email" class="gridValue" defaultValue={userData.email} required></textarea>
                <p class="text-input-error-message" id="email-error"></p>
            </div>
            <div class="grid-item">
                <label for="phoneNumber" id="phoneNumberLabel" class="gridLabel">Phone Number</label>
            </div>
            <div class="grid-item">
                <input id="phoneNumber" type="tel" name="phone" class="gridValue"
                value={userData.phone} size="10"/>
                <p class="text-input-error-message" id="phone-error"></p>
            </div>
            <div class="grid-item">
                <label for="location" id="locationLabel" class="gridLabel">Location</label>
            </div>
            <div class="grid-item">
                <textarea id="location" rows = "1" type="text" name="street" class="gridValue" defaultValue={userData.street}></textarea>
                <p class="text-input-error-message" id="street-error"></p>
                <p class="locationType">Street</p>
                <textarea rows = "1" type="text" name="city" class="gridValue">{userData.city}</textarea>
                <p class="text-input-error-message" id="city-error"></p>
                <p class="locationType">City</p>
                <select name="province" class="gridValue" id="province-select" defaultValue={userData.province ? userData.province : null}>
                <option value={null} hidden></option>
                <option value="alberta">Alberta</option>
                <option value="britishColumbia">British Columbia</option>
                <option value="manitoba">Manitoba</option>
                <option value="newBrunswick">New Brunswick</option>
                <option value="newfoundland">Newfoundland and Labrador</option>
                <option value="northwest">Northwest Territories</option>
                <option value="novaScotia">Nova Scotia</option>
                <option value="nunavut">Nunavut</option>
                <option value="ontario">Ontario</option>
                <option value="pei">Prince Edward Island</option>
                <option value="quebec">Quebec</option>
                <option value="saskatchewan">Saskatchewan</option>
                <option value="yukon">Yukon</option>
                </select>
                <p class="text-input-error-message" id="province-error"></p>
                <p class="locationType" id="provinceLabel">Province/Territory</p>
            </div>
            <div class="grid-item">
                <div class="gridLabel">Preferences</div>
            </div>
            <div class="grid-item">
                <input type="text" list="preferenceList" name="preferences" 
                    id="preferences" class="gridValue" defaultValue={userData.preferences ? userData.preferences : false}/>
                <p class="text-input-error-message" id="preferences-error"></p>
                <datalist id="preferenceList">
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                    <option value="Rabbits">Rabbits</option>
                    <option value="Hamsters">Hamsters</option>
                    <option value="Hedgehogs">Hedgehogs</option>
                    <option value="Quokkas">Quokkas</option>
                </datalist>
            </div>
            </div>
            <button type="submit" class="editButton" id="save-button">Save</button>
        </form>      
        </div>
    </div>
    )
}