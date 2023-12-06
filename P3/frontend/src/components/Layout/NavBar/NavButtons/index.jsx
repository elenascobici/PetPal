import React from 'react';
import { Link } from 'react-router-dom';

const NavButtons = ({ currentUser }) => {
    // Can change to seeker to test the links (WILL REMOVE) 
    // const dummyCurrUser = { type: "shelter" };
    // currentUser = dummyCurrUser;
    // console.log(currentUser);

    return (
        <ul className="nav navbar-nav navbar-right px-2" id="navButtons">
            {currentUser ? (
                <>
                <li><Link to="/accounts/profile" className="yellowButton" id="signUp">Profile</Link></li>
                <li><div id="empty"> </div></li>
                <li><Link to="/accounts/api/token" className="yellowButton" id="logIn">Log out</Link></li>
                </>
            ) : (
                <>
                <li><Link to="/accounts" className="yellowButton me-3" id="signUp">Sign up</Link></li>
                <li><div id="empty"> </div></li>
                <li><Link to="/accounts/api/token" className="yellowButton" id="logIn">Log in</Link></li>
                </>
            )}
        </ul> 
    );
}

export default NavButtons;