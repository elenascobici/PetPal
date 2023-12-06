import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import NavBar from "./NavBar";
import Footer from "./Footer";
// import { APIContext } from "../../contexts/APIContext";
import './style.css';

const Layout = () => {
    return <>
        <div className="page-container">
            <NavBar />
                <Outlet />
            <Footer />
        </div>
    </>
}

export default Layout;