import '../../style.css';
import React, { useState, useEffect } from 'react';

function Name({required, value, check, tofill, fill}){
    const [empty, setEmpty] = useState({
      first: required === "true",
      last: required === "true"
    });
    const [valid, setValid] = useState(false);
    // To avoid delay:
    const [storage, setValues] = useState({
      field: "",
      alt: "",
      content:""
    })

    useEffect (() => {

      if (required === "true" && !empty.first && !empty.last){
        check({...value, name: true});
      } else {
        check({...value, name: false});
      }

      // Put into parent
      if (required === "true"){
          console.log("go here?");
          fill({
            ...tofill,
            [storage.field]: storage.content
          })
      } else {
        // It's the vet
        fill({
          ...tofill,
          [storage.alt]: storage.content
        })
      }
    }, [valid, empty]);

    const inputCheck = (event, field) => {
        const content = event.target.value;
        let alt = "firstVet";

        if (required === "false"){
          alt = [field] + "Vet";
        }

        setEmpty({
          ...empty,
          [field]: required === "true" && content.trim() === ''});

          setValid(required === "true" && !empty.first && !empty.last);
  
        setValues({field: field, alt: alt, content: content.trim()});
      
    }
    
    return <>
        <div className="row mb-3">
                <label for="name" className="col-12 col-form-label text-start col-lg-2 text-lg-end"> Name</label>
                <div className="col-6 col-lg-5"> 
                  <input type="text" className=" name-control form-control" id="firstName" placeholder="First Name" 
                  onChange={(event) => inputCheck(event, "first")} style={{ border:empty.first ? "1px solid":'', borderColor: empty.first ? 'red' : '' }} required/>
                  {empty.first &&  <p className="required-error"> * This field is required </p>}
                </div>
                <div className="col-6 col-lg-5">
                  <input type="text" className="name-control form-control" id="lastName" placeholder="Last Name" onChange={(event) => inputCheck(event, "last")} style={{ border:empty.last ? "1px solid":'', borderColor: empty.last ? 'red' : '' }} required/>
                  {empty.last &&  <p className="required-error"> * This field is required </p>}
                </div>
        </div>
    </>
}

export default Name;