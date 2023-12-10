import {useState, useEffect} from "react";

const ShelterRow = ({shelter}) => {
    const mailTo = "mailto:" + shelter.email;
    console.log(shelter);

    const shelterLink = "/shelter/" + shelter.id + "/" + shelter.name; 

    return (
        <>
        <div class="grid-item grid-item-shelter shelterLink">
        <a class="shelterLink" href={shelterLink}>{shelter.name}</a>
        </div>
        <div class="grid-item grid-item-shelter">{(shelter.street? shelter.street: '') + ' ' + (shelter.city ? shelter.city: '' + ' ') + shelter.province}</div>
        <div class="grid-item grid-item-shelter">
        <a class="email-shelter" href={mailTo}>{shelter.email}</a> 
        </div>
        </>
    )
}

export default ShelterRow;