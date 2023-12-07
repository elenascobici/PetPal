
import Name from "../Name";
import Email from "../Email";
import Phone from "../Phone";
import ProvinceDropdown from "./ProvinceDropdown";
import '../../style.css';
import React, { useState } from 'react';

function AdopterDetails(){

    const [empty, setEmpty] = useState({
      address: false,
      city: false
    });

    const inputCheck = (event, field) => {
      const content = event.target.value;
      setEmpty({
        ...empty,
        [field]: content.trim() === ''});
      
    }

    return <>
            <Name />
            <Email />
            <Phone />
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
                  {/* <div class="col-12  mb-2 col-lg-4">
                      <input class="form-control" id="postalCode" placeholder="Postal Code" required></input>
                  </div> */}
                </div>
              </div>
            </div>
    </>
}

export default AdopterDetails;