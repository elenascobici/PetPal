import '../../style.css';
import React, { useState } from 'react';

function Name({required, value, check}){
    const [empty, setEmpty] = useState({
      first: true,
      last: true
    });

    const inputCheck = (event, field) => {
        const content = event.target.value;
        setEmpty({
          ...empty,
          [field]: required === "true" && content.trim() === ''});

        // Check if valid input
        if (required === "true" && !empty.first && !empty.last){
          check({...value, name: true});
        } else {
          check({...value, name: false});
        }
    }
    
    return <>
        <div class="row mb-3">
                <label for="name" class="col-12 col-form-label text-start col-lg-2 text-lg-end"> Name</label>
                <div class="col-6 col-lg-5"> 
                  <input type="text" class="form-control" id="firstName" placeholder="First Name" 
                  onChange={(event) => inputCheck(event, "first")} style={{ borderColor: empty.first ? 'red' : '' }} required/>
                  {empty.first &&  <p class="required-error"> * This field is required </p>}
                </div>
                <div class="col-6 col-lg-5">
                  <input type="text" class="form-control" id="lastName" placeholder="Last Name" onChange={(event) => inputCheck(event, "last")} style={{ borderColor: empty.last ? 'red' : '' }} required/>
                  {empty.last &&  <p class="required-error"> * This field is required </p>}
                </div>
        </div>
    </>
}

export default Name;