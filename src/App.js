import React, { useState, useEffect } from 'react';
import Charts from './components/Charts';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import GaugeChart from './components/GaugeChart';
import DataTable from './components/DataTable';
import PredictionComponent from './components/PredictionComponent';
import { faChartLine, faChartBar, faGauge, faTable } from '@fortawesome/free-solid-svg-icons';
import { ref, onValue } from 'firebase/database';
import database from './firebase';  
import './App.css';  

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // state when the modal is open
  const [selectedChart, setSelectedChart] = useState(null);  // Track the selected chart
  const [data, setData] = useState([]);  // Store the fetched data

  // Function to handle the opening of the modal
  const openModal = (chartType) => {
    setSelectedChart(chartType);
    setIsModalOpen(true);
    fetchData(chartType);  // Fetch data when the chart is selected
  };

  // Function to handle the closing of the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChart(null);
  };

  // Fetch data from Firebase when a chart is selected
  const fetchData = (chartType) => {
    const dataRef = ref(database, 'systemData'); 
    onValue(dataRef, (snapshot) => {
      const fetchedData = [];
      snapshot.forEach((childSnapshot) => {
        fetchedData.push(childSnapshot.val());
      });
      setData(fetchedData);  // Update state with the fetched data
    });
  };

  // Render the selected chart inside the modal
  const renderChart = () => {
    switch (selectedChart) {
      case 'LineChart':
        return <LineChart data={data} />;
      case 'BarChart':
        return <BarChart data={data} />;
      case 'GaugeChart':
        return <GaugeChart data={data} />;
      case 'DataTable':
        return <DataTable data={data} />;
      case 'PredictionComponent':
        return <PredictionComponent data={data} onClose={closeModal} />;
      default:
        return null;
    }
  };
  

  return (
    <div className="App">
      {/* Main page */}
      <div className="grid-container">
        <Charts label="Line Chart" icon={faChartLine} onClick={() => openModal('LineChart')} />
        <Charts label="Bar Chart" icon={faChartBar} onClick={() => openModal('BarChart')} />
        <Charts label="Gauge Chart" icon={faGauge} onClick={() => openModal('GaugeChart')} />
        <Charts label="Data Table" icon={faTable} onClick={() => openModal('DataTable')} />
        <Charts label="Predictions" icon={faRoad} onClick={() => openModal('PredictionComponent')} />
      </div>

      {/* Modal (shown only if isModalOpen is true) */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="blurred-background"></div>

          <div className="modal">
            {renderChart()}
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
