import '../../style.css';
import React, { useState } from 'react';

function Phone({required, value, check}){

    const [empty, setEmpty] = useState(true);
    const [valid, setValid] = useState(false);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        setEmpty(required === "true" && content.trim() === '');
        setValid(regex.test(content));

        // Check if valid input
        if (required === "true" && !empty && valid){
            check({...value, phone: true});
        } else {
            check({...value, phone : false});
        }
    }

    return <>
        <div className="row mb-3">
            <label for="phone" class="col-12 col-form-label text-start col-lg-2 text-lg-end">Phone Number</label>
            <div className="col-12 mb-2 col-lg-10">
                <input type="phoneNumber" className="form-control" id="phoneNumber" placeholder="Number" 
                onInput={(event) => inputCheck(event)} style={{ borderColor: empty || !valid ? 'red' : '' }} 
                required></input>
                {empty &&  <p className="required-error"> * This field is required </p>}
                {!empty && !valid &&  <p className="required-error"> * Invalid Phone Number (Format: xxx-xxx-xxxx) </p>}
            </div>
        </div>
    </>
}

export default Phone;