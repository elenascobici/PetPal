import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

function Modal({content, show, error, setError}) {
    const [close, setShow] = useState(true);

    const closeModal = (event) => {
        setShow(false);
        setError(null);
    };
    
    return <>
        <div className={`modal fade ${close ? 'show' : ''}`} id="errorModal" tabIndex="-1" aria-labelledby="errorMsg" aria-hidden="true" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="errorMsg">Error</h5>
                    <button type="button" className="btn-close" onClick={(event) => closeModal(event)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p className="modal-text"> {content} </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={(event) => closeModal(event)} >Close</button>
                </div>
                </div>
            </div>
        </div>
    </>
}

export default Modal;