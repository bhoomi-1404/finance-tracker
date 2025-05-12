import React from "react";
import "../assets/charts.css";
import "../assets/general.css";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpenses } from "../Store/useExpenses";
const BarChartComponent = () => {
  const expenses = useExpenses((state) => state.expenses);
  const incomes = useExpenses((state) => state.incomes);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const getWeekOfMonth = (dateStr) => {
    const date = new Date(dateStr);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const dayOfWeek = firstDay.getDay();
    return Math.ceil((dayOfMonth + dayOfWeek) / 7);
  };

  const thisMonthExpenses = expenses.filter((txn) => {
    const d = new Date(txn.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const thisMonthIncomes = incomes.filter((txn) => {
    const d = new Date(txn.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const weeklyDataMap = {};

  [...thisMonthExpenses, ...thisMonthIncomes].forEach((txn) => {
    const week = getWeekOfMonth(txn.date);
    const isExpense = thisMonthExpenses.includes(txn);

    if (!weeklyDataMap[week]) {
      weeklyDataMap[week] = {
        name: `Week ${week}`,
        income: 0,
        expense: 0,
      };
    }

    if (isExpense) {
      weeklyDataMap[week].expense += txn.amount;
    } else {
      weeklyDataMap[week].income += txn.amount;
    }
  });

  const data = Object.values(weeklyDataMap);

  return (
    <div className="charts-container" style={{ gridTemplateColumns: "1fr" }}>
      <div className="heading">Monthly Overview</div>
      <div className="text-sm" style={{ marginBottom: "1.5rem" }}>
        Your financial activity for this month
      </div>
      <ResponsiveContainer width="100%" height={375}>
        {" "}
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default BarChartComponent;
