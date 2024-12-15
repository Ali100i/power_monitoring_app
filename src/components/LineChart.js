import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';  

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
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
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Line
      data={chartData}
      options={options}
      width={1000} 
      height={400} 
    />
  );
};

export default LineChart;
