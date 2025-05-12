import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "../assets/charts.css";
import "../assets/general.css";
import { useExpenses } from "../Store/useExpenses";
import { creatingPieChartData } from "../Utils/GeneralUtils";

export default function App() {
  const expenses = useExpenses((state) => state.expenses);
  const data = creatingPieChartData(expenses);

  return (
    <div className="charts-container">
      <div className="heading">Expense Categories</div>
      <div className="text-sm">Your top spending categories</div>
      <div className="pie-chart-wrapper">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx={200}
            cy={200}
            innerRadius={70}
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        <div className="spend-list">
          {data?.map((entry) => (
            <div className="list-wrapper">
              <div
                className="dot"
                style={{ backgroundColor: entry.color }}
              ></div>
              <div className="entry-name">
                {entry.name?.split("_")?.join(" ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
