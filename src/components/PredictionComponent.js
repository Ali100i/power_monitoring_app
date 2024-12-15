import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ref, onValue } from 'firebase/database';
import database from '../firebase';
import './PredictionComponent.css';

const PredictionComponent = ({ onClose }) => {
  const [predictions, setPredictions] = useState([]);

  // Fetch predictions from Firebase
  useEffect(() => {
    const predictionsRef = ref(database, 'bump_predictions');
    onValue(predictionsRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push(childSnapshot.val());
      });
      setPredictions(data); // Set fetched predictions
    });
  }, []);

  // Define colors for each bump type
  const colorMapping = {
    'small bump': '#4caf50', // Green
    'medium bump': '#ff9800', // Orange
    'large bump': '#f44336', // Red
    'straight road': '#2196f3', // Blue
  };

  // Prepare data for the line chart
  const powerTrendData = {
    labels: predictions.map((p) => p.timestamp),
    datasets: [
      {
        label: 'Power (W)',
        data: predictions.map((p) => p.power),
        borderColor: predictions.map((p) => colorMapping[p.predicted_bump]),
        backgroundColor: predictions.map((p) =>
          colorMapping[p.predicted_bump]?.replace('1)', '0.2)')
        ),
        pointBackgroundColor: predictions.map((p) => colorMapping[p.predicted_bump]),
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: { display: true },
      y: { beginAtZero: true },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="dashboard">
      {/* Close Button */}
      <button className="close-button" onClick={onClose}>
        ✕
      </button>

      {/* Summary Section */}
      <div className="summary">
        <h2>Road Bump Predictions</h2>
        <p>Total Predictions: {predictions.length}</p>
      </div>

      {/* Power Trendline */}
      <div className="trendline">
        <h3>Power Trend</h3>
        <Line data={powerTrendData} options={options} />
      </div>

      {/* Color Key */}
      <div className="color-key">
        <h4>Legend</h4>
        <div>
          <span className="key-box small"></span> Small Bump
        </div>
        <div>
          <span className="key-box medium"></span> Medium Bump
        </div>
        <div>
          <span className="key-box large"></span> Large Bump
        </div>
        <div>
          <span className="key-box straight-road"></span> Straight Road
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="predictions-grid">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className="prediction-card"
            style={{
              borderColor: colorMapping[prediction.predicted_bump],
              borderWidth: '2px',
            }}
          >
            <h3 style={{ color: colorMapping[prediction.predicted_bump] }}>
              {prediction.predicted_bump || 'Unknown'}
            </h3>
            <p>
              <strong>Time:</strong> {prediction.timestamp}
            </p>
            <p>
              <strong>Power:</strong> {prediction.power} W
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionComponent;
