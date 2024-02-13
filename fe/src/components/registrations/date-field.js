import React, { useState, useEffect } from "react";
import './formstyles.css';

function DateField({ initialDate, onChange, label, id }) {
  const [date, setDate] = useState(initialDate || "");

  useEffect(() => {
    setDate(initialDate || "");
  }, [initialDate]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}:
      </label>
      <input
        id={id}
        className="form-input"
        type="date"
        value={date}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DateField;