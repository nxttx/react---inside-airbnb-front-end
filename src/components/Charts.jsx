import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Bar, Pie } from 'react-chartjs-2';
import { getAveragePricesOfNeighbourhoods, getAverageReviewScoresOfNeighbourhoods, getAmountOflistingsPerNeighbourhood } from "../DataAccessLayer/getListings";

import "./Charts.scss";



function Charts(props) {
  let [averagePricesOfNeighbourhoods, setAveragePricesOfNeighbourhoods] = useState(null);
  let [averageReviewScoresOfNeighbourhoods, setAverageReviewScoresOfNeighbourhoods] = useState(null);
  let [amountOflistingsPerNeighbourhood, setAmountOflistingsPerNeighbourhood] = useState(null);



  useEffect(function () {
    async function getData() {
      setAveragePricesOfNeighbourhoods(await getAveragePricesOfNeighbourhoods());
      setAverageReviewScoresOfNeighbourhoods(await getAverageReviewScoresOfNeighbourhoods());
      setAmountOflistingsPerNeighbourhood(await getAmountOflistingsPerNeighbourhood());
    }
    getData();

  }, []);


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
                labels: averagePricesOfNeighbourhoods.map(element => element.neighbourhood),
                datasets: [
                  {
                    label: 'price',
                    data: averagePricesOfNeighbourhoods.map(element => element.avaragePrice),
                    backgroundColor: '#FF385C',
                  },
                ],
              }}

            />
          </div>
          : <></>}

        {averageReviewScoresOfNeighbourhoods != null ?
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
                    text: 'Gemiddelde review score per regio ', // todo use lang function
                  },
                },
              }}

              data={{
                labels: averageReviewScoresOfNeighbourhoods.map(element => element.neighbourhood),
                datasets: [
                  {
                    label: 'score',
                    data: averageReviewScoresOfNeighbourhoods.map(element => element.reviewScoresRating),
                    backgroundColor: '#FF385C',
                  },
                ],
              }}

            />
          </div>
          : <></>}


        {amountOflistingsPerNeighbourhood != null ?
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
                    text: 'Hoeveelheid listings per regio ', // todo use lang function
                  },
                },
              }}

              data={{
                labels: amountOflistingsPerNeighbourhood.map(element => element.neighbourhood),
                datasets: [
                  {
                    label: 'price',
                    data: amountOflistingsPerNeighbourhood.map(element => element.amountOfListings),
                    backgroundColor: ['#00a8ff', '#9c88ff' , '#fbc531', '#4cd137', '#487eb0', '#e84118', 
                    '#7f8fa6',  '#273c75', '#0097e6', '#8c7ae6', '#e1b12c', '#44bd32', '#40739e', '#c23616', '#718093', '#192a56', '#2f3640'],
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
