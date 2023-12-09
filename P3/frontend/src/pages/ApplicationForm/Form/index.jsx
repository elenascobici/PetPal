

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdopterDetails from "./AdopterDetails";
import TextArea from "./TextArea";
import HouseholdDetails from "./HouseholdDetails";
import PetDetails from "./PetDetails";
import Veterinarian from "./Veterinarian";
import Modal from "./Modal";
import '../style.css';
import AlertPopup from './Alert';

import React, { useState, useEffect } from 'react';

function Form({petID}){

    const [valid, setValid] = useState({
        adopterDetails: false,
        reason: false,
    });
    const [adopterID, setAdopterID] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        setAdopterID(localStorage.getItem('id'));
    }, []);

    const [filledValues, setValues] = useState({
        first: '',
        last:'',
        email: '',
        phone: null,
        address: '',
        address2: '',
        city: '',
        province: 'AL',
        reason: '',
        home: 'APT',
        fenced_yard: false,
        owned_pets: '',
        other_pet_behavior: '',
        residents: '',
        firstVet: '',
        lastVet: '',
        vet_contact: null,
        notes: ''
    })


    const submit = () => {
        if (valid.adopterDetails && valid.reason){
            const token = localStorage.getItem('access_token');
            fetch(`http://localhost:8000/application/pet/${petID}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    pet: petID,
                    adopter: adopterID, 
                    name: filledValues.first + ' ' + filledValues.last,
                    email: filledValues.email,
                    phone: filledValues.phone,
                    street: filledValues.address + ' ' + filledValues.address2,
                    city: filledValues.city,
                    province: filledValues.province,
                    reason: filledValues.reason,
                    home: filledValues.home,
                    fenced_yard: filledValues.fenced_yard,
                    owned_pets: filledValues.owned_pets,
                    other_pet_behavior: filledValues.other_pet_behavior,
                    residents: filledValues.residents,
                    vet_name: filledValues.firstVet + ' ' + filledValues.lastVet,
                    vet_contact: filledValues.vet_contact,
                    notes: filledValues.notes,
                 }),
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log('Application data:', data);
                    if (data.detail !== ""){
                        setError(data.detail);
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // Add smooth scrolling effect
                        });
                        // console.log("DO U GO");
                        // return <Modal content = {data.detail} show = {true}/>
                    } else {
                        setError(null);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                }); 
    
        }
    }

    return <>
        {error && valid.adopterDetails && valid.reason && <AlertPopup errorMsg={error} />}
        {(!valid.adopterDetails || !valid.reason) && <AlertPopup errorMsg="Please fill out all the required fields."/>}
        <form action="#" onSubmit={submit}>
            {/* Basic Applicant Info */}
            <AdopterDetails valid = {valid} validCheck={setValid} tofill={filledValues} fill={setValues}/>
            <TextArea info = {{label: "Reason for Adoption",placeholder: "Please explain your reason for this adoption."}} 
            required='true' valid = {valid} validCheck={setValid} tofill={filledValues} fill={setValues} fieldName="reason"/>
            <HouseholdDetails tofill={filledValues} fill={setValues}/>

            <PetDetails tofill={filledValues} fill={setValues}/>
            <Veterinarian valid = {valid} validCheck={setValid} tofill={filledValues} fill={setValues}/>

            <h4 className="text-start mb-4">Extra Notes</h4>
            <TextArea info = {{label: " ", placeholder:"Enter any extra information you would like us to know about you."}} 
            required='false' valid = {{}} validCheck={() => {}} tofill={filledValues} fill={setValues} fieldName="notes" />

            <div className="row mb-3 mt-4">
            {/* {(!valid.adopterDetails || !valid.reason) &&  <p className="final-error required-error"> * Please fill out all the required fields. </p>} */}
            
                <div className="col-12 submit-col">
                <a className="yellowButton" id="submit" onClick={submit}>Submit</a>
                </div>
                
            </div>

        </form>

    
        {/* {error && <Modal content = {error} show={true} error={error} setError={setError}/>} */}

    </>
}

export default Form;