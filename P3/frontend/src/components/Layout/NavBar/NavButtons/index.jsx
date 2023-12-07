import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavButtons = ({ currentUser }) => {
    // Can change to seeker to test the links (WILL REMOVE) 
    // const dummyCurrUser = { type: "shelter" };
    // currentUser = dummyCurrUser;
    // console.log(currentUser);

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setIsAuth(true); 
        }
    }, [isAuth]);

    return (
        <ul className="nav navbar-nav navbar-right px-2" id="navButtons">
            {currentUser ? (
                <>
                <li><Link to="/profile" className="yellowButton me-3" id="signUp">Profile</Link></li>
                <li><div id="empty"> </div></li>
                <li><Link to="/" className="yellowButton" id="logIn">Log out</Link></li>
                </>
            ) : (
                <>
                <li><Link to="/sign-up" className="yellowButton me-3" id="signUp">Sign up</Link></li>
                <li><div id="empty"> </div></li>
                <li><Link to="/log-in" className="yellowButton" id="logIn">Log in</Link></li>
                </>
            )}
        </ul> 
    );
}

export default NavButtons;