import React from "react";
import "./style.css";
import Banner from "./Banner";

function Home() {
    const dummyCurrUser = { type: "seeker" };
    const currentUser = dummyCurrUser;
    const bannerText1 = currentUser === "shelter" ? "Help a friend" : "Meet a new";
    const bannerText2 = currentUser === "shelter" ? "find a home" : "best friend";
    const buttonText = currentUser === "shelter" ? "View applications" : "Apply today";
    return <>
        <div class="main px-6 pt-5">
      <Banner bannerText1={bannerText1} bannerText2={bannerText2} buttonText={buttonText}/>
      <div class="container align-middle gx-5 pt-3" id="vectorButtons">
        <div class="row align-middle gx-2 pt-1 px-0" id="vectorButtons">
          <div class="col-xl-3 col-lg-6 col-md-6 col-xs-12 text-center d-flex justify-content-center">
            <a type="button" class="circle" href="#">
              <img class="vector" id="dog" src="images/dog.png" />
              <div class="vectorLabel">Dogs</div>
            </a>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-xs-12 text-center d-flex justify-content-center">
            <a type="button" class="circle" href="search-filter-cats.html">
              <img class="vector" id="cat" src="images/cat.png" />
              <div class="vectorLabel">Cats</div>
            </a>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-xs-12 text-center d-flex justify-content-center">
            <a type="button" class="circle" href="#">
              <img class="vector" id="other" src="images/other.png" />
              <div class="vectorLabel">Other</div>
            </a>
          </div>
          <div class="col-xl-3 col-lg-6 col-md-6 col-xs-12 text-center d-flex justify-content-center">
            <a type="button" class="circle" href="shelters.html">
              <img class="vector" id="shelter" src="images/shelter.png" />
              <div class="vectorLabel">Shelters</div>
            </a>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <h1 id="quote">"A true friend leaves paw <br class="break" /> prints on your heart."</h1>
      </div>
      <div class="container">
        <p class="text">Pets available to adopt today</p>
      </div>
      <div class="container align-middle text-center">
        <div class="row align-middle">
          <div class="col text-center d-flex justify-content-center">
            <a type="button" class="pet" href="#">
              <img class="petImage" src="images/buddy.jpg"  />
              <div class="petLabel">Buddy</div>
            </a>
          </div>
          <div class="col text-center d-flex justify-content-center">
            <a type="button" class="pet"> 
            {/* EDIT HREF */}
              <img class="petImage" src="images/quokkie.png" />
              <div class="petLabel">Quokkie</div>
            </a>
          </div>
          <div class="col text-center d-flex justify-content-center">
            <a type="button" class="pet" href="pet-detail.html">
              <img class="petImage" src="images/calcifer.jpg" />
              <div class="petLabel">Calcifer</div>
            </a>
          </div>
          <div class="col text-center d-flex justify-content-center">
            <a type="button" class="pet" href="#">
              <img class="petImage" src="images/hokey-pokey.jpg"  />
              <div class="petLabel">Hokey Pokey</div>
            </a>
          </div>
          <div class="col text-center d-flex justify-content-center">
            <a type="button" class="pet" href="search.html" id="morePets">
              <div id="morePetsText">Meet more future friends</div> 
              <div id="arrow"></div>
            </a>
          </div>
        </div>
      </div>
      <div class="container">
        <p class="text" id="shelterOrgs">Meet our shelter organizations</p>
      </div>
      <div class="container" id="meetShelters">
        <div id="shelters">
          <a href="#">
            <img src="images/straycatshelter.png" class="shelterLogo" />
          </a>
          <a href="#">
            <img src="images/justpawsshelter.jpg" class="shelterLogo" />
          </a>
          <a href="#">
            <img src="images/hearthomeshelter.png" class="shelterLogo" />
          </a>
          <a href="#">
            <img src="images/pethouseshelter.png" class="shelterLogo" />
          </a>
          <a href="#">
            <img src="images/forgottenonesshelter.png" class="shelterLogo" />
          </a>
          <a href="#">
            <img src="images/animalshelter.jpg" class="shelterLogo" />
          </a>
          <a href="shelter-detail.html">
            <img src="images/pawpatrol.png" class="shelterLogo" />
          </a>
        </div>
      </div>
    </div>
    </>
}
export default Home;