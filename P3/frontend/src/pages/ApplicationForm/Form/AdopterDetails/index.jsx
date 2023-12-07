
import Name from "../Name";
import Email from "../Email";
import Phone from "../Phone";
import ProvinceDropdown from "./ProvinceDropdown";
import '../../style.css';
import React, { useEffect, useState } from 'react';

function AdopterDetails({valid, validCheck}){
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
      
    }

    useEffect (() => {
      if (fieldState.name && fieldState.email && fieldState.phone && empty.address && empty.city){
        validCheck({...valid, adopterDetails: true});
      } else {
        validCheck({...valid, adopterDetails: false});
      }

    }, [fieldState]);

    return <>
            <Name required="true" value= {fieldState} check={setField}/>
            <Email value= {fieldState} check={setField}/>
            <Phone required="true" value= {fieldState} check={setField}/>
            <div class="row mb-3">
              <label for="address" class="col-12 col-form-label text-start col-lg-2 text-lg-end">Address</label>
              <div class="col-12 col-lg-10"> 
                <input class="form-control mb-2" id="streetAddress1" placeholder="Address Line 1" 
                onChange={(event) => inputCheck(event, "address")} style={{ borderColor: empty.address ? 'red' : '' }} required></input>
                {empty.address &&  <p class="required-error"> * This field is required </p>}
                <input class="form-control mb-2" id="streetAddress2" placeholder="Address Line 2"></input>
        
                <div class="row"> 
                  <div class="col-12 mb-2 col-lg-6 ">
                      <input class="form-control" id="city" placeholder="City" 
                      onChange={(event) => inputCheck(event, "city")} style={{ borderColor: empty.city ? 'red' : '' }}required></input>
                      {empty.city &&  <p class="required-error"> * This field is required </p>}
                  </div>
                  <div class="col-12 mb-2 col-lg-6">
                    <ProvinceDropdown />
                  </div>
                </div>
              </div>
            </div>
    </>
}

export default AdopterDetails;