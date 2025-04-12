import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";

const SalesChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/sales_data_sample.csv") // Place your Kaggle file in the `public` folder
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const labels = result.data.map(row => row.Month);
            const values = result.data.map(row => parseFloat(row.Sales));

            setChartData({
              labels: labels,
              datasets: [
                {
                  label: "Monthly Sales",
                  data: values,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            });
          },
        });
      });
  }, []);

  return (
    <div>
      <h2>Sales Data</h2>
    </div>
  );
};

export default SalesChart;
