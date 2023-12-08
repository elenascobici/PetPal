
import '../../style.css';
import React, { useState, useEffect } from 'react';

function TextArea({info, required, valid, validCheck, tofill, fill, fieldName}){

    const [empty, setEmpty] = useState({
        field: false,
        require: false
    });

    useEffect(() => {
        setEmpty((empty) => ({field: required === "true", 
                require: required === 'true'
        }));
    }, []);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        setEmpty({
            ...empty,
            field: content.trim() === ''});

        if (required === "true"){
            validCheck({...valid,
            reason: !empty.field})
        }

        // Put into parent
        fill({
            ...tofill,
            [fieldName]: content.trim()
        })
    }

    return <>
        <div className="row mb-3">
            <label for="reason" className="col-12 col-form-label text-start col-lg-2 text-lg-end"> {info.label} </label>
            <div className="col-12 col-lg-10">
                <textarea className="form-control" id="reason" rows="3" placeholder={info.placeholder} onChange={(event) => inputCheck(event)} style={{ borderColor: empty.field && empty.require ? 'red' : '' }} required/>
                  {empty.require && empty.field &&  <p className="required-error"> * This field is required </p>}
            </div>
        </div>
    </>;
}

export default TextArea;