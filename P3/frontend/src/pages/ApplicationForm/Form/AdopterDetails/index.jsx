
import Name from "../Name";
import Email from "../Email";
import Phone from "../Phone";
import ProvinceDropdown from "./ProvinceDropdown";
import '../../style.css';
import React, { useEffect, useState } from 'react';

function AdopterDetails({valid, validCheck, tofill, fill}){
    const [fieldState, setField] = useState({
      name: false,
      email: false,
      phone: false,
    })

    const [empty, setEmpty] = useState({
      address: true,
      city: true
    });

    const inputCheck = (event, field) => {
      const content = event.target.value;

      setEmpty({
        ...empty,
        [field]: content.trim() === ''});
      
      // Put the value into parent:
      fill({
        ...tofill,
        [field]: content.trim()
      })    
    }

    useEffect (() => {
      if (fieldState.name && fieldState.email && fieldState.phone && !empty.address && !empty.city){
        validCheck({...valid, adopterDetails: true});
      } else {
        validCheck({...valid, adopterDetails: false});
      }
    }, [fieldState, empty]);

    return <>
            <Name required="true" value= {fieldState} check={setField} tofill={tofill} fill={fill}/>
            <Email value= {fieldState} check={setField} tofill={tofill} fill={fill}/>
            <Phone required="true" value= {fieldState} check={setField} tofill={tofill} fill={fill}/>
            <div className="row mb-3">
              <label for="address" className="col-12 col-form-label text-start col-lg-2 text-lg-end">Address</label>
              <div className="col-12 col-lg-10"> 
                <input className="form-control mb-2" id="streetAddress1" placeholder="Address Line 1" 
                onChange={(event) => inputCheck(event, "address")} style={{ borderColor: empty.address ? 'red' : '' }} required></input>
                {empty.address &&  <p className="required-error"> * This field is required </p>}
                <input className="form-control mb-2" id="streetAddress2" placeholder="Address Line 2" onChange={(event) => inputCheck(event, "address2")}></input>
        
                <div className="row"> 
                  <div className="col-12 mb-2 col-lg-6 ">
                      <input className="form-control" id="city" placeholder="City" 
                      onChange={(event) => inputCheck(event, "city")} style={{ borderColor: empty.city ? 'red' : '' }}required></input>
                      {empty.city &&  <p className="required-error"> * This field is required </p>}
                  </div>
                  <div className="col-12 mb-2 col-lg-6">
                    <ProvinceDropdown tofill={tofill} fill={fill}/>
                  </div>
                </div>
              </div>
            </div>
    </>
}

export default AdopterDetails;