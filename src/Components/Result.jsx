import { Stack } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins
);

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { WPM, CPM, mistakes } = location.state || {};

  const handlePlayGame = () => {
    navigate("/GenerateData");
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Typing Performance Metrics",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Metrics",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Speed",
        },
      },
    },
  };

  const LineChartData = {
    labels: ["WPM", "CPM", "Mistakes"],
    datasets: [
      {
        label: "Performance",
        data: [WPM, CPM, mistakes],
        borderColor: ["#1376a2", "#f7d000", "red"],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: ["#1376a2", "#f7d000", "red"],
        pointBorderColor: ["#1376a2", "#f7d000", "red"],
        borderWidth: 3,
        tension: 0.6,
        fill: true,
      },
    ],
  };

  return (
    <Stack className="resultBox">
      <h1>Typing Result: </h1>
      <div className="chart">
        <Line options={options} data={LineChartData} />
      </div>

      <div className="result">
        <p>
          Words Per Minute (WPM): <strong>{WPM}</strong>
        </p>
        <p>
          Characters Per Minute (CPM): <strong>{CPM}</strong>
        </p>
        <p>
          Mistakes: <strong>{mistakes}</strong>
        </p>

        <button onClick={handlePlayGame} className="btn">
          Play Again
        </button>
      </div>
    </Stack>
  );
};

export default Result;
