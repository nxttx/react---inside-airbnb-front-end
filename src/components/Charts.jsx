import React, {useState, useEffect} from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar, Pie } from 'react-chartjs-2';
import { getAveragePricesOfNeighbourhoods, getAverageReviewScoresOfNeighbourhoods } from "../DataAccessLayer/getListings";

import "./Charts.scss";



function Charts(props) {
  let [averagePricesOfNeighbourhoods, setAveragePricesOfNeighbourhoods] = useState(null);
  let [averageReviewScoresOfNeighbourhoods, setAverageReviewScoresOfNeighbourhoods] = useState(null);


  useEffect(function(){
    async function getData(){
      setAveragePricesOfNeighbourhoods(await getAveragePricesOfNeighbourhoods());
      setAverageReviewScoresOfNeighbourhoods(await getAverageReviewScoresOfNeighbourhoods())
    }
    getData();

  }, [])
  

  return (
    <div className="container">
      <div className="charts">
        {averagePricesOfNeighbourhoods != null ?
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
                  text: 'Gemiddelde prijs per regio', // todo, use lang function
                },
              },
            }}

            data={{
              labels: averagePricesOfNeighbourhoods.map(element=> element.neighbourhood),
              datasets: [
                {
                  label: 'price',
                  data: averagePricesOfNeighbourhoods.map(element=> element.avaragePrice),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}

          />
        </div>
        : <></>}

        {averageReviewScoresOfNeighbourhoods != null ?
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
                  text: 'hoeveelheid listings per regio ', // todo use lang function
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
      : <></>}
      </div>
    </div>
  );
}

export default Charts;
