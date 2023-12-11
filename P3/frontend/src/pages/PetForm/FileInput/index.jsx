import React from 'react';

const FileInput = ({ id, onChange, label, error }) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-12 col-form-label text-start col-lg-2 text-lg-end">{label}</label>
    <div className="col-12 col-lg-10">
      <input type="file" className="form-control" id={id} onChange={onChange} />
      {error && <p className="form-error">{error}</p>}
      {!error && <p className="form-simple-message">Please submit .png</p>}
    </div>
  </div>
);

export default FileInput;
