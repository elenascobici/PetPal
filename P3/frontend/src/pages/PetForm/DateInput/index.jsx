import React from 'react';

const DateInput = ({ id, value, onChange, label, error }) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-12 col-form-label text-start col-lg-2 text-lg-end">{label}</label>
    <div className="col-12 col-lg-10">
      <input
        type="date"  
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        pattern="\d{4}-\d{2}-\d{2}"
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  </div>
);

export default DateInput;
