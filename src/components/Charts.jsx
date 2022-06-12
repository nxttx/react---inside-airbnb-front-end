import * as React from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar, Pie } from 'react-chartjs-2';
import "./Charts.scss";



function Charts(props) {

  return (
    <div className="container">
      <div className="charts">
        <div className="chart">

          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Chart.js Bar Chart',
                },
              },
            }}

            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'price',
                  data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'].map(element => Math.random() * 1000),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}

          />
        </div>
        <div className="chart">

          <Pie
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Chart.js Bar Chart',
                },
              },
            }}

            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'price',
                  data: ['January', 'February', 'March', 'April', 'May', 'June', 'July'].map(element => Math.random() * 100),
                  // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}

          />
        </div>
      </div>
    </div>
  );
}

export default Charts;
