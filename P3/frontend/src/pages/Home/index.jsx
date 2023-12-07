import React from "react";
import "./style.css";
import Banner from "./Banner";
import VectorButtons from "./VectorButtons";
import Dog from "../../assets/images/dog.png";
import Cat from "../../assets/images/cat.png";
import Other from "../../assets/images/other.png";
import Shelter from "../../assets/images/shelter.png";
import PetImages from "./PetImages";
import ShelterOrgs from "./ShelterOrgs";
import 'bootstrap/dist/css/bootstrap.min.css';



const Home = () => {
    const userType = localStorage.getItem('user_type');
    const userId = localStorage.getItem('id');
    const bannerText1 = userType === "Shelter" ? "Help a friend" : "Meet a new";
    const bannerText2 = userType === "Shelter" ? "find a home" : "best friend";
    const buttonText = userType === "Shelter" ? "View applications" : "Apply today";

    return <>
        <div class="main" id="home">
      <Banner bannerText1={bannerText1} bannerText2={bannerText2} buttonText={buttonText}/>
      <div class="container align-middle gx-5 pt-3" id="vectorButtons">
        <div class="row align-middle gx-2 pt-1 px-0" id="vectorButtons">
          <VectorButtons link="/search" label="Dogs" id="dog" image={Dog} />
          <VectorButtons link="/search" label="Cats" id="cat" image={Cat} />
          <VectorButtons link="/search" label="Other" id="other" image={Other} />
          <VectorButtons link="/accounts/shelter-list" label="Shelters" id="shelter" image={Shelter} />
        </div>
      </div>
      <div class="container text-center">
        <h1 id="quote">"A true friend leaves paw <br class="break" /> prints on your heart."</h1>
      </div>
      <div class="container">
        <p class="text">Pets available to adopt today</p>
      </div>
      <div class="container align-middle text-center">
        <PetImages userType={userType} userId={userId} />
      </div>
      <div class="container">
        <p class="text" id="shelterOrgs">Meet our shelter organizations</p>
      </div>
      <div class="container" id="meetShelters">
        <ShelterOrgs userType={userType} userId={userId} />
      </div>
    </div>
    </>
}
export default Home;