import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../assets/charts.css";
import "../assets/general.css";
import { useExpenses } from "../Store/useExpenses";
import { creatingLineChartData } from "../Utils/GeneralUtils";
const LineChartComponent = () => {
  const expenses = useExpenses((state) => state?.expenses);
  const data = creatingLineChartData(expenses);
  console.log("🚀 ~ LineChartComponent ~ expenses:", expenses);
  const textColor = "#475569";
  const gridColor = "#e2e8f0";
  return (
    <div className="charts-container">
      <div className="heading">
        Spending Trends{" "}
      </div>
      <div className="text-sm" style={{ marginBottom: "1.5rem" }}>
        Your expense trends over time
      </div>

      <ResponsiveContainer width="100%" height={375}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" tick={{ fill: textColor }} />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderColor: "#4a5568",
              color: textColor,
            }}
            formatter={(value) => [`₹${value}`, "Amount"]}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default LineChartComponent;
