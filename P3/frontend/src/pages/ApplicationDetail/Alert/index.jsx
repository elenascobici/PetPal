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
        {close && (<div className="container mt-5 alert-update">
         <Alert key='success' variant='success' onClose={closeAlert} dismissible>
            Application has been successfully Updated.
        </Alert>
        </div>)}
    </>;
}

export default AlertPopup;