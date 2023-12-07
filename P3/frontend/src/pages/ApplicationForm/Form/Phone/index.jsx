import '../../style.css';
import React, { useState } from 'react';

function Phone({required}){

    const [empty, setEmpty] = useState(false);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        setEmpty(required === "true" && content.trim() === '');
    }

    return <>
        <div class="row mb-3">
            <label for="phone" class="col-12 col-form-label text-start col-lg-2 text-lg-end">Phone Number</label>
            <div class="col-12 mb-2 col-lg-10">
                <input type="phoneNumber" class="form-control" id="phoneNumber" placeholder="Number" 
                onInput={(event) => inputCheck(event)} style={{ borderColor: empty ? 'red' : '' }} 
                required></input>
                {empty &&  <p className="required-error"> * This field is required </p>}
            </div>
        </div>
    </>
}

export default Phone;