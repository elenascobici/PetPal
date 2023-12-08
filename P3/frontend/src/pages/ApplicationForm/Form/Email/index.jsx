import '../../style.css';
import React, { useState, useEffect } from 'react';

function Email({value, check, tofill, fill}){
    const [empty, setEmpty] = useState(true);
    const [valid, setValid] = useState(false);
    const [storage, setValues] = useState({
        content: "",
    })

    useEffect (() => {
        if (!empty && valid){
            check({...value, email: true});
        } else {
            check({...value, email: false});
        }

         // Put into parent
         if(!empty){
            fill({
                ...tofill,
                email: storage.content
            })
        } else {
            fill({
                ...tofill,
                email: ''
            })
        }
    }, [storage, empty]);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        const regex = /^(?![a-zA-Z0-9\.!%+-]*\.\.)[a-zA-Z0-9\.!%+-]+@[\w-]+(\.\w+){1,}$/;
        setEmpty(content.trim() === '');
        setValid(regex.test(content));
        setValues({content: content});
    }

    return <>
        <div className="row mb-3">
            <label for="email" className="col-12 col-form-label text-start col-lg-2 text-lg-end">Email</label>
                <div className="col-12 col-lg-10">
                    <input type="email" className="form-control" id="email" placeholder="ryder@pawpatrol.com" 
                    onInput={(event) => inputCheck(event)} style={{ borderColor: empty || !valid ? 'red' : '' }} 
                    required/>
                    {empty &&  <p className="required-error"> * This field is required </p>}
                    {!empty && !valid &&  <p className="required-error"> * Invalid Email </p>}
                </div>
        </div>
    </>;

}

export default Email;