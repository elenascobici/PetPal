import { useEffect } from "react";
import FirstLayer from "./FirstLayer";
import SecondLayer from "./SecondLayer";
import "./style.css"

function ApplicationHome(){

    useEffect(() =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Add smooth scrolling effect
        });
    },[]);

    return <>
        <div className="main-home-app">
                <FirstLayer />
                <SecondLayer />
        </div>

    </>;
}

export default ApplicationHome;