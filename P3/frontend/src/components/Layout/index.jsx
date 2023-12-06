import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
// import { APIContext } from "../../contexts/APIContext";
import './style.css';

const Layout = () => {
    return <>
        <div class="page-container">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid" id="headerContainer">
                <a class="navbar-brand px-3 m-0" id="petpal" href="home.html">PetPal</a>
                <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" 
                data-bs-target="#menuItems" aria-controls="menuItems" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="menuItems">
                <ul class="nav navbar-nav me-auto mb-2 mb-lg-0" id="navbarList">
                    <li class="nav-item">
                    <a class="nav-link active px-3" id="navHome" aria-current="page" href="home.html">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link px-3" id="navSearch" href="search.html">Search for Pets</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link px-3" id="navApply" href="application-home.html">Apply Now</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link px-3" id="navShelters" href="shelters.html">Shelters</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right px-2" id="navButtons">
                    <li><a class="yellowButton me-3" href="sign-up.html" id="signUp">Sign up</a></li>
                    <li><div id="empty"> </div></li>
                    <li><a class="yellowButton" href="log-in.html" id="logIn">Log in</a></li>
                </ul>
                </div>
            </div>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer class="text-center">
      <div class="container-fluid">
        <div class="row gx-0" id="footer">
          <div class="footerContact col">
            <div id="connect">Connect with Us!
              <p id="connectPetPal">PetPal</p>
            </div>
          </div>
          <div class="col-1" id="verticalLineBox">
            <div id="verticalLine"></div>
          </div>
          <div id="contactInfo" class="col">
            <a id="link" href="mailto:petpal23@gmail.com">petpal23@gmail.com</a>        	
            <p id="telephone">(987) 654 - 3210</p>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item" id="insta">
                <a href="#" role="button">
                  <i class="bi bi-instagram"></i>
                </a>
              </li>
              <li class="list-group-item" id="x">
                <a href="#" role="button">
                  <i class="bi bi-twitter-x"></i>
                </a>
              </li>
              <li class="list-group-item" id="fb">
                <a href="#" role="button">
                  <i class="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div> 
        </div>
        <div class="row">
          <div class="copyright">&copy Copyright 2023</div>
      </div>
    </div>
    </footer>
        </div>
    </>
}

export default Layout;