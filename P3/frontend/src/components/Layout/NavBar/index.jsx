import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import NavLink from "./NavLink";
import NavButtons from "./NavButtons";

import '../style.css';


const NavBar = () => {
    const links = [
        { to: "/", idName: "Home", label: "Home", allowedUsers: ["Shelter", "Seeker"]},
        { to: "/search", idName: "Search", label: "Search for Pets", allowedUsers: ["Shelter", "Seeker"] },
        { to: "/application/home/", idName: "Apply", label: "Apply Now", allowedUsers: ["Seeker"] },
        { to: "/shelters", idName: "Shelters", label: "Shelters", allowedUsers: ["Shelter", "Seeker"] },
        { to: "/pets", idName: "Listings", label: "My Pet Listings", allowedUsers: ["Shelter"] },
        { to: "/application/list/", idName: "Applications", label: "Applications", allowedUsers: ["Shelter", "Seeker"] },
    ];
    const userType = localStorage.getItem('user_type');

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid" id="headerContainer">
                <Link to="/" className="navbar-brand px-3 m-0" id="petpal" >PetPal</Link>
                <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" 
                data-bs-target="#menuItems" aria-controls="menuItems" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menuItems">
                <ul className="nav navbar-nav me-auto mb-2 mb-lg-0" id="navbarList">
                    {links.map( link => (
                        <NavLink key={link.label} link={link.to} idName={link.idName} label={link.label} 
                            users={link.allowedUsers} userType={userType} />
                    ))}
                </ul>
               <NavButtons userType={userType} />
                </div>
            </div>
        </nav>
        )
}

export default NavBar;