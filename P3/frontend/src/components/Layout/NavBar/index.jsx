import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import NavLink from "./NavLink";
import NavButtons from "./NavButtons";
import '../style.css';

const NavBar = () => {
    const links = [
        { to: "/", idName: "Home", label: "Home", allowedUsers: ["shelter", "seeker"]},
        { to: "/search", idName: "Search", label: "Search for Pets", allowedUsers: ["shelter", "seeker"] },
        { to: "/application-home", idName: "Apply", label: "Apply Now", allowedUsers: ["seeker"] },
        { to: "/accounts/shelter-list", idName: "Shelters", label: "Shelters", allowedUsers: ["seeker"] },
        { to: "/pets", idName: "Listings", label: "My Pet Listings", allowedUsers: ["shelter"] },
        { to: "/application/list", idName: "Applications", label: "Applications", allowedUsers: ["shelter", "seeker"] },
    ];

    return <>
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
                            users={link.allowedUsers} />
                    ))}
                </ul>
               <NavButtons />
                </div>
            </div>
        </nav>
        </>
}

export default NavBar;