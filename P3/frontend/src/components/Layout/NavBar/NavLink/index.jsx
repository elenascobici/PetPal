import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ link, idName, label, users, currentUser }) => {
    // Can change to seeker to test the links (WILL REMOVE) 
    const dummyCurrUser = { type: "shelter" };
    currentUser = dummyCurrUser;
    console.log(currentUser);

    const location = useLocation();
    const isActive = location.pathname === link;
    const isActiveNotHome = link !== "/" && location.pathname.startsWith(link);
    const isUserAllowed = users.includes(currentUser?.type) || (!currentUser && users.includes("seeker"));
    const isDisabled = !currentUser && link !== "/";

    if (!isUserAllowed) {
        return null;
    }
    if (currentUser.type === "seeker" && label === "Applications") {
        label = "My Applications";
    }

    return (
        <li className="nav-item">
            {isDisabled ? (
                <Link to="/" className="nav-link px-3" id="navHome">
                    {label}
                </Link>
            ) : (
                <Link to={link} className={`nav-link px-3 ${isActive ? 'active' : isActiveNotHome ? "active" : ''}`} id={`nav${idName}`}>
                    {label}
                </Link>
            )}
            
        </li>
    );
}

export default NavLink;