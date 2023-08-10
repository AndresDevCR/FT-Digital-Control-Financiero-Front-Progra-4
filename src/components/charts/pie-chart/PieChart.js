import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No hay datos disponibles para mostrar.</div>;
  }

  const chartData = {
    labels: data.map(item => `Mes ${item.month}`),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 4,
        weight: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PieChart;
