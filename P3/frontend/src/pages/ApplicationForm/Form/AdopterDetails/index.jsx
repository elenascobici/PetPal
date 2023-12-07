
import Name from "../Name";
import Email from "../Email";
import Phone from "../Phone";
import ProvinceDropdown from "./ProvinceDropdown";
import '../../style.css';

function AdopterDetails(){
    return <>
            <Name />
            <Email />
            <Phone />
            <div class="row mb-3">
              <label for="address" class="col-12 col-form-label text-start col-lg-2 text-lg-end">Address</label>
              <div class="col-12 col-lg-10"> 
                <input class="form-control mb-2" id="streetAddress1" placeholder="Address Line 1" required></input>
                <input class="form-control mb-2" id="streetAddress2" placeholder="Address Line 2"></input>
        
                <div class="row"> 
                  <div class="col-12 mb-2 col-lg-4 ">
                      <input class="form-control" id="city" placeholder="City" required></input>
                  </div>
                  <div class="col-12 mb-2 col-lg-4">
                    <ProvinceDropdown />
                  </div>
                  <div class="col-12  mb-2 col-lg-4">
                      <input class="form-control" id="postalCode" placeholder="Postal Code" required></input>
                  </div>
                </div>
              </div>
            </div>
    </>
}

export default AdopterDetails;