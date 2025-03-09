import React from "react";
import { Line } from "react-chartjs-2";

const StatisticsLineChartComponent = ({ data = [] }) => {
  const chartData = {
    labels: data.map((item) => item.Date),
    datasets: [
      {
        label: "Total Confirmed Cases",
        data: data.map((item) => item["Total Confirmed Cases"]),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Total Deaths",
        data: data.map((item) => item["Total Deaths"]),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Total Recovered",
        data: data.map((item) => item["Total Recovered"]),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Active Cases",
        data: data.map((item) => item["Active Cases"]),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default StatisticsLineChartComponent;
