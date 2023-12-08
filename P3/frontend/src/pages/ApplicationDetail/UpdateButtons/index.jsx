import React, { useState, useEffect} from 'react';

function UpdateButtons ({show, showBtns, appID, notify}){
    let userType = "Seeker" //! TESTING PURPOSES CHANGE LATER TO ACTUAL CONTEXT
    const [data, setData] = useState({});
    

    const changeStatus = (event, newStatus) => {
        console.log(newStatus);
        fetch(`http://localhost:8090/application/${appID}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMTQ3MDI0LCJpYXQiOjE3MDIwNjA2MjQsImp0aSI6ImY0Mzg0MTI3MzQ0NTQ2NmQ4ZmZlNDhkMmUzYjU5M2M1IiwidXNlcl9pZCI6MywidXNlcl90eXBlIjoiU2Vla2VyIiwiaWQiOjN9.7n60oLI1_ltlgxO9oYDeSJ5aM95jyecGlOcyUf7-XK8',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            status: newStatus
        }), 
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log('Application data:', data);
            setData(data);
            if (!data.detail){
                showBtns(data.status === 'P');
                notify("yes"); // notifyToggle in AppDetail
            } 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return <>
        {userType === "Shelter" && show && (<div className="status-container">
            <div className="status-update row mb-3">
                <button type="button" class="btn btn-success col-4 col-md-2 col-lg-2"
                onClick={(event) => changeStatus(event, 'A')}>
                Accept
                </button>
                <button type="button" class="btn-format btn btn-danger col-4 col-md-2 col-lg-2"
                onClick={(event) => changeStatus(event, 'D')}>
                Decline
                </button>
                <p className="col 7 col-md-4 col-lg-8"></p>
            </div>
        </div>)}
        {userType === "Seeker" && show && (<div className="status-container">
            <div className="status-update row mb-3">
                <button type="button" class="btn btn-danger col-4 col-md-2 col-lg-2"
                onClick={(event) => changeStatus(event, 'W')}>
                Withdraw
                </button>
                <p className="col 8 col-md-10 col-lg-10"></p>
            </div>
        </div>)}
    </>;
}

export default UpdateButtons;