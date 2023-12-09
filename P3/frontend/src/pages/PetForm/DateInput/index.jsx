import React from 'react';

const DateInput = ({ id, value, onChange, label}) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-12 col-form-label text-start col-lg-2 text-lg-end">{label}</label>
    <div className="col-12 col-lg-10">
      <input
        type="text"
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={"YYYY-MM-DD"}
        pattern="\d{4}-\d{2}-\d{2}"
        required
      />
    </div>
  </div>
);

export default DateInput;

