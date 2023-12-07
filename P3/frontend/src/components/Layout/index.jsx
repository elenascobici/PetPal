import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import NavBar from "./NavBar";
import Footer from "./Footer";
// import { APIContext } from "../../contexts/APIContext";
import './style.css';

const Layout = () => {
    return <>
        <header>
            <NavBar />
        </header>
        <div className="page-container">
            <Outlet />
        </div>
        <footer>
            <Footer />
        </footer>
    </>
}

export default Layout;