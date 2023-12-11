import React from 'react';

const TextInput = ({ id, value, onChange, label, placeholder, error }) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-12 col-form-label text-start col-lg-2 text-lg-end">{label}</label>
    <div className="col-12 col-lg-10">
      <input type="text" className="form-control" id={id} value={value} onChange={onChange} placeholder={placeholder} />
      {error && <p className="form-error">{error}</p>}
    </div>
  </div>
);

export default TextInput;
