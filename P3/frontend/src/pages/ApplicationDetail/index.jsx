import BackButton from "./BackButton";
import PetInfo from "./PetInfo";
import Line from "./Line";
import Modal from "./Modal"
import "./style.css"
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import UpdateButtons from "./UpdateButtons";

function ApplicationDetail(){
    //! TO DO:
    //! - Refactor
    //! - Test Image
    //! - Proper Auth Token and URL param retrieval for update n detail
    //! FIX MODAL IT GOES INTO HEADER

    // Get the application:
    let appID = 3; //! CHANGE
    
    const navigate = useNavigate();
    
    const [app_data, setAppData] = useState({});
    const [formattedPhone, setFormat] = useState("");
    const [fullProvince, setProvince] = useState("");
    const [fullHome, setHome] = useState("");
    const [show, showBtns] = useState(true);
    const [notify, notifyToggle] = useState(null);

    const provinces = {
        'ON': 'Ontario',
        'SK': 'Saskatchewan',
        'AL': 'Alberta',
        'NB': 'New Brunswick',
        'BC': 'British Columbia',
        'NW': 'Newfoundland and Labrador',
        'MB': 'Manitoba',
        'NS': 'Nova Scotia',
        'PE': 'Prince Edward Island',
        'QB': 'Quebec',
        'NU': 'Nunavut',
        'YK': 'Yukon',
        'NT': 'Northwest Territories'
    }

    const homes = {
        'SFH': 'Single-Family Home',
        'APT': 'Apartment',
        'CON': 'Condominium',
        'TNH': 'Townhouse',
        'DUP': 'Duplex',
        'TRI': 'Triplex',
        'MOH': 'Mobile Home',
        'TIN': 'Tiny House', 
        'MAN': 'Mansion',
        'BUN': 'Bungalow',
        'LOG': 'Log House',
        'FLO': 'Floating Home',
        'IGL': 'Igloo'
    }


    useEffect(() => {
        fetch(`http://localhost:8090/application/${appID}/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMTQ3MDI0LCJpYXQiOjE3MDIwNjA2MjQsImp0aSI6ImY0Mzg0MTI3MzQ0NTQ2NmQ4ZmZlNDhkMmUzYjU5M2M1IiwidXNlcl9pZCI6MywidXNlcl90eXBlIjoiU2Vla2VyIiwiaWQiOjN9.7n60oLI1_ltlgxO9oYDeSJ5aM95jyecGlOcyUf7-XK8',
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Application data:', data);
            if (data.detail){
                // Not authenticated
                console.log("HERE??" + data.detail);
                navigate("/log-in/");
            }
            setAppData(data);
            // only show the options if u can modify them
            showBtns(data.status === 'P');
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
    }, []);

    useEffect(() => {
        const province = provinces[app_data.province];
        const home = homes[app_data.home];
        // console.log("here")
        formatPhone();
        setProvince(province);
        setHome(home);
        // app_data.notes = "Many people come and go from my household, but I intend to give the pet a personal space to not be disrupted. My family are very nice and would not bully the pet";
    }, [app_data.phone, app_data.province, app_data.home]); 

    const formatPhone = () =>{
        const number = String(app_data.phone);
        setFormat(`${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`);
    }
    

    return <>
    <div className="main-detail">
        <div className="application-details">
            <BackButton />
            <h1 className="app-title display-5"> My Application </h1>
        </div>
        <UpdateButtons show={show} showBtns={showBtns} appID={appID} notify={notifyToggle}/>
        <div className="content">
            <div className="pet-summary">
                <PetInfo petID={1}/>
                <div className="content-details">
                    <div className="details-text">
                        <div className="details-space">
                            <Line label="Name:" style="line" answer={app_data.name} />
                            <Line label="Email address:" style="line" answer={app_data.email} />
                            <Line label="Phone Number:" style="line" answer={formattedPhone} />
                            <Line label="Residential Address:" style="line" answer={app_data.street + ', ' + app_data.city + ', ' + fullProvince + ', Canada'} />
                            <Line label="Reason:" style="line-long" answer={app_data.reason} />
                            <Line label="Home Type:" style="line" answer={fullHome} />
                            <Line label="Fenced Yard?:" style="line" answer={String(app_data.fenced_yard).charAt(0).toUpperCase() + String(app_data.fenced_yard).slice(1)} />
                            <Line label="Other Pets Owned:" style="line-long" answer={app_data.owned_pets ? app_data.owned_pets : 'N/A'} />
                            <Line label="Other Pets' Behavior:" style="line-long" answer={app_data.other_pet_behavior ? app_data.other_pet_behavior : 'N/A'} />
                            <Line label="Household Residents:" style="line-long" answer={app_data.residents ? app_data.residents : 'N/A'} />
                            <Line label="Veterinarian Name:" style="line" answer={app_data.vet_name ? app_data.vet_name : 'N/A'} />
                            <Line label="Veterinarian Contact:" style="line" answer={app_data.vet_contact ? app_data.vet_contact : 'N/A'} />
                            <Line label="Extra Notes:" style="line-long" answer={app_data.notes ? app_data.notes : 'N/A'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        
        <div className="content">
          <div className="sub-content">
            <p className="heading3 heading-res"> Message History </p>
          </div>
          <div className="details-text">
            <div className="message-history">
              <div className="msg-pos">
               {/* Messages */}
            </div>
          </div>
        </div>
      </div>

      {notify && <Modal content = "Your application status has been updated successfully" show={true} error={notify} setError={notifyToggle}/>}

    </div>
    </>;
}

export default ApplicationDetail;