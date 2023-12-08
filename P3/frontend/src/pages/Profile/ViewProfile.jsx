import React from "react";
import "./style.css";
import { ViewProfileShelter } from "./ViewProfileShelter";

export const ViewProfile = () => {
    const isAShelter = localStorage.getItem("user_type") === "Shelter";
    return (
        isAShelter ? <ViewProfileShelter></ViewProfileShelter> : <></>
    )
}