import React from "react";

function TextField(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  const inputClass = `form-input ${props.className || ''}`;

  return (
    <div>
      <label htmlFor={props.id} className="form-label">
        {props.label}:
      </label>
      <input
        id={props.id}
        className={inputClass}
        type={props.type}
        value={props.value}
        onChange={handleChange}
        placeholder={`Enter your ${props.label}`}
      />
    </div>
  );
}

export default TextField;
