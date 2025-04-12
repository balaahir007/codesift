import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1400, 1800, 2000, 1600, 2200],
      backgroundColor: "#BCC9EA",
      borderColor: "rgba(64, 245, 61, 1)",
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
    },
    {
      label: "Revenue",
      data: [1000, 600, 800, 1000, 1100, 1400],
      backgroundColor: "#C3DEF8",
      borderColor: "rgba(64, 245, 61, 1)",
      borderWidth: 1,
      pointRadius: 1,
      fill: true,
    },
  ],
};
const barData = {
  labels: ["Sales", "Revenue", "Product", "Customers"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1400, 1800, 2000, 1600, 2200],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(64, 245, 61, 1)",
    },
  ],
};

const generatePieData = (datasets) => {
  return {
    labels: ["Progress", "Remaining"],
    datasets: datasets.map(({ label, data, backgroundColor, cutout }) => ({
      label,
      data: [data, 100 - data],
      backgroundColor: [backgroundColor[0], backgroundColor[1]],
      cutout: cutout || "100%",
    })),
  };
};

const pieData = generatePieData([
  {
    label: "New Product",
    data: 70,
    backgroundColor: ["#FF6384", "#cccaca"],
    cutout: "50%",
  },
  {
    label: "Pending",
    data: 20,
    backgroundColor: ["#36A2EB", "#cccaca"],
    cutout: "50%",
  },
  {
    label: "Completed",
    data: 50,
    backgroundColor: ["#FFCE56", "#cccaca"],
    cutout: "50%",
  },
]);

const AdminStats = () => {
  const overViewOfMonthSales = [
    {
        text: "Sales",
        count : "10K"
    },
    {
        text: "Revenue",
        count : "3K"
    },
    {
        text: "Product",
        count : "2K"
    },
    {
        text: "Customers",
        count : "6K"
    },
  ];
  return (
    <div className="p-6 pb-20 md:px-10 lg:px-16 xl:w-280 lg:w-200 md:w-180 w-full overflow-y-scroll h-full scrollbar-hide fixed rounded-md bg-white shadow">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 xl:gap-40">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="shadow-md border p-4 px-6 rounded-lg flex flex-col items-center"
          >
            <h1>1200</h1>
            <span>Sales</span>
          </div>
        ))}
      </div>

      <h1 className="md:mt-10 text-primary font-medium">Month Sales</h1>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex md:w-full w-30">
        <div className="w-full md:w-40 border h-72 rounded-xl flex flex-col gap-4 justify-center">
          {overViewOfMonthSales.map((item,index)=>(
            <div key={index} className="ml-8">
              <h1>{item?.text}</h1>
              <span>{item?.count}</span>
            </div>
          ))}
        </div>
        <div className="border xl:-ml-6 h-72 rounded-xl xl:rounded-l-none px-10 xl:border-l-0 flex-grow">
          <Line data={data} />
        </div>
        </div>
        <div className="w-full md:w-50 border h-72 rounded-xl">
          <Bar data={barData} />
        </div>
      </div>

      <h1 className="md:mt-10 text-primary font-medium">
        New Product in Farmsnap
      </h1>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="border h-72 rounded-xl flex-grow"></div>
        <div
          className="w-full xl:w-50 border h-72 rounded-xl flex flex-col gap-4"
          style={{ width: "100%", maxWidth: "200px", margin: "auto" }}
        >
          <h1 className="m-2">Product Status</h1>
          <Doughnut data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
