
import '../../style.css';
import React, { useState, useEffect } from 'react';

function TextArea({info, required}){

    const [empty, setEmpty] = useState({
        field: false,
        require: false
    });

    useEffect(() => {
        setEmpty((empty) => ({...empty, 
                require: required === 'true'
        }));
    }, []);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        setEmpty({
            ...empty,
            field: content.trim() === ''});
    }

    return <>
        <div class="row mb-3">
            <label for="reason" class="col-12 col-form-label text-start col-lg-2 text-lg-end"> {info.label} </label>
            <div class="col-12 col-lg-10">
                <textarea class="form-control" id="reason" rows="3" placeholder={info.placeholder} onChange={(event) => inputCheck(event)} style={{ borderColor: empty.field && empty.require ? 'red' : '' }} required/>
                  {empty.require && empty.field &&  <p class="required-error"> * This field is required </p>}
            </div>
        </div>
    </>;
}

export default TextArea;