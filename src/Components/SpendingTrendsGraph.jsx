import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../assets/general.css";
import { getWeeklyExpenseData } from "../Utils/GeneralUtils";
import { useExpenses } from "../Store/useExpenses";
const SpendingTrendsGraph = () => {
  const expense = useExpenses((state) => state.expenses);
  const weeklyData = getWeeklyExpenseData(expense);
  console.log("🚀 ~ SpendingTrendsGraph ~ weeklyData:", weeklyData);

  return (
    <div>
      <div style={{ padding: "0px 1.5rem 1.5rem 1.5rem" }}>
        <div className="heading">Spending Trends</div>
        <div className="text-sm"> Your spending patterns over time</div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={weeklyData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="amount" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SpendingTrendsGraph;
