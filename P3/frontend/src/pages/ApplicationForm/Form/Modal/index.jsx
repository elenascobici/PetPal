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
        <div class={`modal fade ${close ? 'show' : ''}`} id="errorModal" tabIndex="-1" aria-labelledby="errorMsg" aria-hidden="true" style={{ display: show ? 'block' : 'none' }}>
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorMsg">Error</h5>
                    <button type="button" class="btn-close" onClick={(event) => closeModal(event)} aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="modal-text"> {content} </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={(event) => closeModal(event)} >Close</button>
                </div>
                </div>
            </div>
        </div>
    </>
}

export default Modal;