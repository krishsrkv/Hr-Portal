import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeChart = ({ data }) => {
  // Ensure to use 'workedHours' field (from updated HrDashboard component)
  const generateColors = (numColors) => {
    return Array.from({ length: numColors }, () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`
    );
  };

  const borderColors = generateColors(data.length);

  const chartData = {
    labels: data.map((emp) => emp.name),
    datasets: [
      {
        label: 'Hours Worked',
        data: data.map((emp) => emp.workedHours || 0), // Ensure we use 'workedHours'
        backgroundColor: 'transparent', // Transparent bars
        borderColor: borderColors, // Dynamic border colors
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours Worked',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Bar data={chartData} options={options} style={{ backgroundColor: 'transparent' }} />
    </div>
  );
};

export default EmployeeChart;
