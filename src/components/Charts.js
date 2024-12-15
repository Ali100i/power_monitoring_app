import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Charts.css';

const Charts = ({ icon, label, onClick }) => {
  return (
    <div className="chart-box" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="chart-icon" />
      <h3>{label}</h3>
    </div>
  );
};

export default Charts;
