import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alert from 'react-bootstrap/Alert';

import React, { useState } from 'react';

function AlertPopup(){
    const [close, setShow] = useState(true);

    const closeAlert = (event) => {
        setShow(false);
    };
    

    return <>
    {/* {console.log("HERE")} */}
        <div className="container mt-5">
         <Alert key='danger' variant='danger'>
            Please fill out all the required fields.
        </Alert>
        </div>
    </>;
}

export default AlertPopup;