import React from 'react';
import './profile.css';

const ProgressBar = ({ current, total }) => {
  let percentage = 0;
  if (total > 0) {
    percentage = Math.round((current / total) * 100);
    percentage = Math.min(100, Math.max(0, percentage)); 
  }

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: percentage + '%' }}>
        <div className="progress-filled"></div>
      </div>
      <div className="progress-info">
        <span className="progress-percentage">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;