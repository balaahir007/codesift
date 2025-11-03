import React from "react";
import { FaUsers, FaEye, FaUserTie, FaMoneyBillWave } from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "All Users",
    value: 5234,
    icon: <FaUsers className="text-white text-xl" />,
    iconBg: "bg-blue-500",
    percent: 8.2,
  },
  {
    id: 2,
    title: "Today Course Views",
    value: 1320,
    icon: <FaEye className="text-white text-xl" />,
    iconBg: "bg-purple-500",
    percent: -3.5,
  },
  {
    id: 3,
    title: "Total Authors",
    value: 112,
    icon: <FaUserTie className="text-white text-xl" />,
    iconBg: "bg-green-500",
    percent: 2.1,
  },
  {
    id: 4,
    title: "User Spend (₹)",
    value: "₹48,390",
    icon: <FaMoneyBillWave className="text-white text-xl" />,
    iconBg: "bg-yellow-500",
    percent: 6.7,
  },
];

const DashboardStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
        >
          <div>
            <h4 className="text-gray-500 text-sm font-medium">{stat.title}</h4>
            <p className="text-xl font-bold">{stat.value}</p>
            <p
              className={`text-sm mt-1 ${
                stat.percent >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {stat.percent >= 0 ? "+" : ""}
              {stat.percent}%{" "}
              <span className="text-gray-400">vs last month</span>
            </p>
          </div>
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.iconBg}`}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsCards;
