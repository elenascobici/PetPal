import React from "react"
import DefaultProfilePicture from "../../assets/images/user.png"
import "./style.css"

export const ViewMyProfileSeeker = ({userData}) => {
    return (
        <div class="page-container">
        <div class="main">
        <div id="title">Update My Account</div>
        <form action="" method="post" id="profileInfo">
            <div class="container gx-0" id="userEdit">
            <div class="form-control" id="profile">
                <img id="profileImage" src={DefaultProfilePicture} />
                <label class="form-label btn" for="imageUpload" id="edit">Change profile picture</label>
                <input id="imageUpload" type="file" 
                    name="profile_photo" placeholder="Photo" required="" capture/>
            </div>
            </div>

            <div class="grid">
            <div class="grid-item">
                <label for="firstName" id="firstNameLabel" class="gridLabel">First name</label>
            </div>
            <div class="grid-item">
                <input id="firstName" type="text" name="firstName" class="gridValue" value={userData.first_name} required/>
            </div>
            <div class="grid-item">
                <label for="lastName" id="lastNameLabel" class="gridLabel">Last name</label>
            </div>
            <div class="grid-item">
                <input id="lastName" type="text" name="lastName" class="gridValue" value={userData.last_name}/>
            </div>
            <div class="grid-item">
                <label for="username" id="usernameLabel" class="gridLabel">Username</label>
            </div>
            <div class="grid-item">
                <input id="username" type="text" name="username" class="gridValue" readOnly value={userData.username}/>
            </div>
            <div class="grid-item">
                <label for="password" id="passwordLabel" class="gridLabel">Password</label>
            </div>
            <div class="grid-item">
                <input id="password" type="password" name="password" class="gridValue" value="password" required/>
            </div>
            <div class="grid-item">
                <label for="emailAddress" id="emailLabel" class="gridLabel">Email Address</label>
            </div>
            <div class="grid-item">
                <textarea id="emailAddress" rows = "1" type="text" name="emailAddress" class="gridValue" value={userData.email} required></textarea>
            </div>
            <div class="grid-item">
                <label for="phoneNumber" id="phoneNumberLabel" class="gridLabel">Phone Number</label>
            </div>
            <div class="grid-item">
                <input id="phoneNumber" type="tel" name="phoneNumber" class="gridValue" required
                value={userData.phone} size="10"/>
            </div>
            <div class="grid-item">
                <label for="location" id="locationLabel" class="gridLabel">Location</label>
            </div>
            <div class="grid-item">
                <textarea id="location" rows = "1" type="text" name="street" class="gridValue"></textarea>
                <p class="locationType">Street</p>
                <textarea rows = "1" type="text" name="city" class="gridValue" required>Toronto</textarea>
                <p class="locationType">City</p>
                <select name="province" class="gridValue" value={userData.province} required>
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
                <p class="locationType" id="provinceLabel">Province/Territory</p>
            </div>
            <div class="grid-item">
                <div class="gridLabel">Preferences</div>
            </div>
            <div class="grid-item">
                <input type="text" list="preferenceList" name="preferences" id="preferences" class="gridValue" value={userData.preferences ? userData.preferences : ""}/>
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
            <a type="submit" class="editButton" href="user-update-empty.html" id="save">Save</a>
        </form>      
        </div>
    </div>
    )
}