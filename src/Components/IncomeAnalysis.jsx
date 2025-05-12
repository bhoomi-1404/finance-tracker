import React from "react";
import "../assets/general.css";
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
import { useExpenses } from "../Store/useExpenses";
import { getWeeklyExpenseData } from "../Utils/GeneralUtils";
const IncomeAnalysis = () => {
  const incomes = useExpenses((state) => state.incomes);
  const weeklyData = getWeeklyExpenseData(incomes);

  return (
    <div>
      <div style={{ padding: "0px 1.5rem 1.5rem 1.5rem" }}>
        <div className="heading">Income Analysis</div>
        <div className="text-sm"> Track your income sources and trends</div>
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
export default IncomeAnalysis;
