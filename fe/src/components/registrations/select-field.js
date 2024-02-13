import React from 'react';
import './formstyles.css';

function SelectField({ label, value, onChange, options, id }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}:
      </label>
      <select
        id={id}
        className="form-input"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;