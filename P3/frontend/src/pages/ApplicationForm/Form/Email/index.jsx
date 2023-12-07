import '../../style.css';
import React, { useState } from 'react';

function Email(){
    const [empty, setEmpty] = useState(false);
  
    const inputCheck = (event) => {
        const content = event.target.value;
        setEmpty(content.trim() === '');
    }

    return <>
        <div className="row mb-3">
            <label for="email" className="col-12 col-form-label text-start col-lg-2 text-lg-end">Email</label>
                <div className="col-12 col-lg-10">
                    <input type="email" className="form-control" id="email" placeholder="ryder@pawpatrol.com" 
                    onInput={(event) => inputCheck(event)} style={{ borderColor: empty ? 'red' : '' }} 
                    required/>
                    {empty &&  <p className="required-error"> * This field is required </p>}
                </div>
        </div>
    </>;

}

export default Email;