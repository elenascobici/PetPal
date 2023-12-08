import '../../style.css';
import React, { useState, useEffect } from 'react';

function Phone({required, value, check, tofill, fill}){

    const [empty, setEmpty] = useState(required==="true");
    const [valid, setValid] = useState(false);
    const [storage, setValues] = useState({
        content: ""
    })

    useEffect (() => {
        const newVal = {...value, phone: required === "true" && !empty && valid};
        check(newVal);

        // Put into parent
        if (required === "true"){
            if (valid){
                fill({
                    ...tofill,
                    phone: storage.content
                })
            } else {
                fill({
                    ...tofill,
                    phone: ''
                })
            }
        } else {
            // it is the vet
            //! FIX TO MAKE VALIDATION FOR INVALID PHONE LATER?
            if (storage.content.trim() !=''){
                fill({
                    ...tofill,
                    vet_contact: storage.content
                })
            }
            
        }
    }, [valid]);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        const regex = /^[0-9]{10}$/;
        setEmpty(required === "true" && content.trim() === '');
        setValid(regex.test(content));
        setValues({content: content.trim()});
        
        // console.log("CHECK FILL: " + tofill.phone);
    }

    return <>
        <div className="row mb-3">
            <label for="phone" className="col-12 col-form-label text-start col-lg-2 text-lg-end">Phone Number</label>
            <div className="col-12 mb-2 col-lg-10">
                <input type="phoneNumber" className="form-control" id="phoneNumber" placeholder="Number" 
                onInput={(event) => inputCheck(event)} style={{ borderColor: empty || !valid && required === "true" ? 'red' : '' }} 
                required></input>
                {empty &&  <p className="required-error"> * This field is required </p>}
                {!empty && !valid && required === "true" && <p className="required-error"> * Invalid Phone Number (must be 10 digits) </p>}
            </div>
        </div>
    </>
}

export default Phone;