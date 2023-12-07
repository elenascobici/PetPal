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
      

        // console.log("CHECK FILL: " + tofill.first + ' '+ tofill.last);
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