import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ link, idName, label, users, userType }) => {
    const location = useLocation();
    const isActive = location.pathname === link;
    const isActiveNotHome = link !== "/" && location.pathname.startsWith(link);
    const isUserAllowed = (userType && users.includes(userType)) || (!userType && users.includes("Seeker"));
    const isDisabled = !userType && link !== "/";

    if (!isUserAllowed) {
        return null;
    }
    if (userType === "Seeker" && label === "Applications") {
        label = "My Applications";
    }

    return (
        <li className="nav-item">
            {isDisabled ? (
                <Link to="/sign-up" className="nav-link px-3" id="navHome">
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