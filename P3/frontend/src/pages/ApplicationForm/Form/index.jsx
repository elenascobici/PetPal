
// A component that will render the form
// Will have a function that handles submits 
// No need to handle time cus thats handled in the backend


import AdopterDetails from "./AdopterDetails";
import TextArea from "./TextArea";
import HouseholdDetails from "./HouseholdDetails";
import PetDetails from "./PetDetails";
import Veterinarian from "./Veterinarian";
import '../style.css';

import React, { useState } from 'react';

// Will also include validation.
function Form(){

    const [valid, setValid] = useState({
        adopterDetails: false,
        reason: false,
      });


    const onSubmit = () => {

    }

    return <>
        <form action="#" method="post">
            {/* Basic Applicant Info */}
            <AdopterDetails valid = {valid} validCheck={setValid}/>
            <TextArea info = {{label: "Reason for Adoption",placeholder: "Please explain your reason for this adoption."}} required='true'/>
            <HouseholdDetails />

            <PetDetails />
            <Veterinarian />

            <h4 class="text-start mb-4">Extra Notes</h4>
            <TextArea info = {{label: " ", placeholder:"Enter any extra information you would like us to know about you."}} required='false'/>

            <div class="row mb-3 mt-4">
                <div class="col-12 submit-col">
                <a class="yellowButton" id="submit" href="user-applications-success.html"  data-bs-toggle="modal" data-bs-target="#errorModal">Submit</a>
                </div>
            </div>

        </form>

    </>
}

export default Form;