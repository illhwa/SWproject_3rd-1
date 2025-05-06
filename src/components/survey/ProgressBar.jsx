// ProgressBar.js
import React from 'react';
import '../../styles/ProgressBar.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-text">
        {currentStep + 1} / {totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;