import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  if (data.length === 0) {
    return <p>No data available to render chart.</p>;
  }

  // Slice the last 10 data records
  const lastTenRecords = data.slice(-10);

  const timestamps = lastTenRecords.map(item => item.timestamp);
  const powerData = lastTenRecords.map(item => item.power);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Power',
        data: powerData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar
      data={chartData}
      options={options}
      width={1000}  
      height={400}  
    />
  );
};

export default BarChart;
