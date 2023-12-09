import React from 'react';

const TextAreaInput = ({ id, value, onChange, label, rows }) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-12 col-form-label text-start col-lg-2 text-lg-end">{label}</label>
    <div className="col-12 col-lg-10">
      <textarea className="form-control" id={id} value={value} onChange={onChange} required rows={rows}></textarea>
    </div>
  </div>
);

export default TextAreaInput;
