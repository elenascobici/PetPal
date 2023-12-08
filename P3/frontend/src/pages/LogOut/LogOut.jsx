import React from "react";

function LogOut() {
    localStorage.clear();
    window.location.href = "http://localhost:3000/";
}

export default LogOut;