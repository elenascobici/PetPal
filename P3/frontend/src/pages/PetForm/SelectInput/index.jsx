import React from 'react';

export const sizeOptions = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' }
];

export const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

export const behaviourOptions = [
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Shy', label: 'Shy' },
  { value: 'Aggressive', label: 'Aggressive' }
];

export const typeOfPetOptions = [
  { value: 'Cat', label: 'Cat' },
  { value: 'Dog', label: 'Dog' },
  { value: 'Aquatic', label: 'Aquatic' },
  { value: 'Bird', label: 'Bird' },
  { value: 'Other', label: 'Other' }
];

export const statusOptions = [
  { value: 'Available', label: 'Available' },
  // { value: 'Adopted', label: 'Adopted' },
  // { value: 'Pending', label: 'Pending' },
  // { value: 'Withdrawn', label: 'Withdrawn' }
];

const SelectInput = ({ id, value, onChange, label, options }) => (
  <div className="row mb-3">
    <label htmlFor={id} className="col-12 col-form-label text-start col-lg-2 text-lg-end">{label}</label>
    <div className="col-12 col-lg-10">
      <select 
      className="form-control" 
      id={id} 
      value={value} 
      onChange={onChange} 
      required>
        <option value="" disabled>Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectInput;
