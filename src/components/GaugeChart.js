import React from 'react';
import GaugeChart from 'react-gauge-chart';

const GaugeChartComponent = ({ data }) => {
  if (data.length === 0) {
    return <p>No data available to render chart.</p>;
  }

  const lastPower = data[data.length - 1].power;

  const maxPower = 25;  // max power

  return (
    <div className="gauge-container">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={30}
        percent={lastPower / maxPower} 
        textColor="#000000"
        formatTextValue={() => `${lastPower} W`}  // Display actual power in watts (W)
      />
    </div>
  );
};

export default GaugeChartComponent;
