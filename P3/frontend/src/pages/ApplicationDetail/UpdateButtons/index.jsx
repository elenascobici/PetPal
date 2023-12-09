import React, { useState, useEffect} from 'react';

function UpdateButtons ({show, showBtns, appID, notify}){
    // let userType = "Seeker" //! TESTING PURPOSES 
    const [data, setData] = useState({});
    const [userType, setUserType] = useState("");

    useEffect(() => {
        setUserType(localStorage.getItem('user_type'));
    }, []);
    

    const changeStatus = (event, newStatus) => {
        // console.log(newStatus);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/application/${appID}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
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