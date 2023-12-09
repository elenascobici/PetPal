import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Alert from 'react-bootstrap/Alert';

import React, { useState } from 'react';

function AlertPopup({errorMsg}){

    return <>
        <div className="container mt-5">
         <Alert key='danger' variant='danger'>
            {errorMsg}
        </Alert>
        </div>
    </>;
}

export default AlertPopup;