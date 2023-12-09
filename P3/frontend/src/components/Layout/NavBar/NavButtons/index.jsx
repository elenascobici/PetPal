import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NavButtons = ({ userType }) => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setIsAuth(true); 
        }
    }, [isAuth]);

    return (
        <ul className="nav navbar-nav navbar-right px-2" id="navButtons">
            {isAuth ? (
                <>
                <li><Link to="/profile" className="yellowButton me-3" id="profile">Profile</Link></li>
                <li><div id="empty"> </div></li>
                <li><Link to="/log-out" className="yellowButton" id="logOut">Log out</Link></li>
                <a id="notifications" onClick={() => navigate("/notifications/")}><i id="notificationBell" class="bi bi-bell-fill"></i></a>
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