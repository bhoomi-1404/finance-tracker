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
import { useExpenses } from "../Store/useExpenses";
import { getMonthlyCategoryData } from "../Utils/GeneralUtils";

const CategoryTrends = () => {
  const expenses = useExpenses((state) => state.expenses);
  const data= getMonthlyCategoryData(expenses);

  return (
    <div style={{padding: "0px 1.5rem 1.5rem 1.5rem"}}>
      <div style={{ padding: "0px 1.5rem 1.5rem 0px" }}>
        <div className="heading">Income Analysis</div>
        <div className="text-sm">
          {" "}
          Track your income sources and trends
        </div>{" "}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Each category as a separate Line */}
          <Line
            type="monotone"
            dataKey="food_dining"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="housing"
            stroke="#ec4899"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="transportation"
            stroke="#f97316"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="entertainment"
            stroke="#10b981"
            strokeWidth={2}
            dot
          />
          <Line
            type="monotone"
            dataKey="shopping"
            stroke="#60a5fa"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CategoryTrends;
