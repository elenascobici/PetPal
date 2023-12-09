import React from "react"
import DefaultProfilePicture from "../../assets/images/user.png"
import "./style.css"

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

        // Fetch pets.
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("access_token");
        fetch(`http://localhost:8000/pet/shelter/${userId}/pets/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
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

    return (
        <div class="page-container">
            <div class="main">
            <div id="title">Update Shelter Details</div>
            <form action="" method="post" id="update-shelter-profile-form">
            <div class="container gx-0" id="shelterLogoEdit">
                <div class="form-control" id="profile">
                    <img id="profileImage" src={profilePath} />
                    <label class="form-label btn" for="imageUpload" id="edit">Change shelter logo</label>
                    <input id="imageUpload" type="file" 
                        name="profile_picture" placeholder="Photo" capture onChange={handleImageUpload}/>
                </div>
            </div>
                <div class="grid">
                <div class="grid-item">
                    <label for="shelterName" id="shelterNameLabel" class="gridLabel">Shelter Name</label>
                </div>
                <div class="grid-item">
                    <textarea id="shelterName" rows = "1" type="text" name="name" class="gridValue" required defaultValue={userData.name}></textarea>
                </div>
                <div class="grid-item">
                    <label for="password" id="passwordLabel" class="gridLabel">Password</label>
                </div>
                <div class="grid-item">
                    <input id="password" type="password" name="password" class="gridValue" defaultValue="" />
                </div>
                <div class="grid-item">
                    <label for="emailAddress" id="emailLabel" class="gridLabel">Email Address</label>
                </div>
                <div class="grid-item">
                    <textarea id="emailAddress" rows = "1" type="text" name="email" class="gridValue" defaultValue={userData.email} required></textarea>
                </div>
                <div class="grid-item">
                    <label for="phoneNumber" id="phoneNumberLabel" class="gridLabel">Phone Number</label>
                </div>
                <div class="grid-item">
                    <input id="phoneNumber" type="tel" name="phone" class="gridValue" required
                    defaultValue={userData.phone} size="10" />
                </div>
                <div class="grid-item">
                    <label for="location" id="locationLabel" class="gridLabel">Location</label>
                </div>
                <div class="grid-item">
                    <textarea id="location" rows = "1" type="text" name="street" class="gridValue" defaultValue={userData.street}></textarea>
                    <p class="locationType">Street</p>
                    <textarea rows = "1" type="text" name="city" class="gridValue" defaultValue={userData.city} required></textarea>
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
                    <input id="phonePreferred" type="radio" name="preferred_contact" value="phone" checked={userData.preferred_contact === "phone"} />
                    <span class="checkmark"></span>
                    <label for="phonePreferred" class="contactOptions">Phone</label>
                    <input id="emailPreferred" type="radio" name="preferred_contact" value="email"  checked={userData.preferred_contact === "email"}  />
                    <span class="checkmark"></span>
                    <label for="emailPreferred" class="contactOptions">Email</label>
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
                <div class="container" id="carouselContainer">
                <div id="petsCarousel" class="carousel slide" data-bs-interval="false">
                    <div class="carousel-indicators">
                    <button class="carouselIndicator active" type="button" data-bs-target="#petsCarousel" data-bs-slide-to="0" aria-current="true"></button>
                    <button class="carouselIndicator" type="button" data-bs-target="#petsCarousel" data-bs-slide-to="1"></button>
                    <button class="carouselIndicator" type="button" data-bs-target="#petsCarousel" data-bs-slide-to="2"></button>
                    </div>
                    <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="false">
                        <div class="container align-middle text-center" id="carouselPage">
                        <button class="carousel-control-prev carousel-btn" type="button" data-bs-target="#petsCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next carousel-btn" type="button" data-bs-target="#petsCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                        <div class="grid petGrid">
                            <div class="grid-item">
                            <a type="button" class="pet" href="#">
                                <img class="petImage" src="images/buddy.jpg"/>
                                <div class="petLabel">Buddy</div>
                            </a>
                            <div class="selectStatus">
                                <select name="buddyStatus" class="status">
                                <option class="statusOption available" value="available" selected>Available</option>
                                <option class="statusOption pending" value="pending">Pending</option>
                                <option class="statusOption adopted" value="adopted">Adopted</option>
                                <option class="statusOption withdrawn" value="withdrawn">Withdrawn</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="false">
                        <div class="container align-middle text-center" id="carouselPage">
                        <button class="carousel-control-prev carousel-btn" type="button" data-bs-target="#petsCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next carousel-btn" type="button" data-bs-target="#petsCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                        <div class="grid petGrid">
                            <div class="grid-item">
                            <a type="button" class="pet" href="#">
                                <img class="petImage" src="images/buddy.jpg"/>
                                <div class="petLabel">Buddy</div>
                            </a>
                            <div class="selectStatus">
                                <select name="buddyStatus" class="status">
                                <option class="statusOption available" value="available" selected>Available</option>
                                <option class="statusOption pending" value="pending">Pending</option>
                                <option class="statusOption adopted" value="adopted">Adopted</option>
                                <option class="statusOption withdrawn" value="withdrawn">Withdrawn</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="false">
                        <div class="container align-middle text-center" id="carouselPage">
                        <button class="carousel-control-prev carousel-btn" type="button" data-bs-target="#petsCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next carousel-btn" type="button" data-bs-target="#petsCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                        <div class="grid petGrid">
                            <div class="grid-item">
                            <a type="button" class="pet" href="#">
                                <img class="petImage" src="images/buddy.jpg"/>
                                <div class="petLabel">Buddy</div>
                            </a>
                            <div class="selectStatus">
                                <select name="buddyStatus" class="status">
                                <option class="statusOption available" value="available" selected>Available</option>
                                <option class="statusOption pending" value="pending">Pending</option>
                                <option class="statusOption adopted" value="adopted">Adopted</option>
                                <option class="statusOption withdrawn" value="withdrawn">Withdrawn</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
                </div>
                <button type="submit" class="editButton" id="save-button">Save</button>
                </form>
            </div>
            <div class="buttons">
                <a href="pet-creation.html" class="editButton">
                Create new pets ⏵
                </a>
        </div>
        </div>
    )
}