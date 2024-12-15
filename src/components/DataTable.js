import React from 'react';
import './DataTable.css';  

const DataTable = ({ data }) => {
  if (data.length === 0) {
    return <p>No data available to display.</p>;
  }

  // Slice the last 10 data records
  const lastTenRecords = data.slice(-10);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Voltage (V)</th>
          <th>Current (A)</th>
          <th>Power (W)</th>
        </tr>
      </thead>
      <tbody>
        {lastTenRecords.map((item, index) => (
          <tr key={index}>
            <td>{item.timestamp}</td>
            <td>{item.voltage}</td>
            <td>{item.current}</td>
            <td>{item.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
