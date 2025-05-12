import React from "react";
import LeftPanel from "../Components/LeftPanel";
import "../assets/dashboard.css";
import TopBar from "../Components/TopBar";
import "../assets/general.css";
import Filters from "../Components/Filters";
import FinancialSummaryCard from "../Components/FinancialSummaryCard";
import { FiCreditCard } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { RxArrowTopRight, RxArrowBottomRight } from "react-icons/rx";
import LineChartComponent from "../Components/LineChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
import { useUIStore } from "../Store/useExpenses";
import BarChartComponent from "../Components/BarChartComponent";
import SavingsGoal from "../Components/SavingsGoal";
import QuickActions from "../Components/QuickActions";
import { useExpenses } from "../Store/useExpenses";
import RollBackScreen from "../Components/RollBackScreen";
const Dashboard = () => {
  const { isPanelCollapsed } = useUIStore();
  const rawData = JSON.parse(localStorage.getItem("finance-storage"));
  console.log("🚀 ~ Dashboard ~ rawData:", rawData);
  const expenses = useExpenses((state) => state.expenses);
  const income = useExpenses((state) => state.incomes);
  const budgets = useExpenses((state) => state.budgets);
  const totalIncome = income?.reduce((sum, txn) => sum + txn.amount, 0) || 0;
  const totalExpenses =
    expenses?.reduce((sum, txn) => sum + txn.amount, 0) || 0;
  const totalBalance = totalIncome - totalExpenses || 0;
  const overall =
    budgets.find((b) => b.category === "Overall_Budget")?.total || 0;

  const allocated = budgets
    .filter((b) => b.category !== "Overall_Budget")
    .reduce((sum, b) => sum + b.total, 0);

  const budgetLeft = overall - allocated;
  const budgetLeftPercentage =
    overall > 0 ? ((budgetLeft / overall) * 100).toFixed(2) : 0;
  console.log("🚀 ~ Dashboard ~ budgetLeft:", budgetLeft, budgetLeftPercentage);

  return (
    <div style={{ height: "100vh" }}>
      <TopBar />
      <div className={!isPanelCollapsed ? "container" : "collapsed-container"}>
        {!isPanelCollapsed ? <LeftPanel /> : <></>}
        <div className="data-container" style={{ overflowX: "hidden" }}>
          <div className="header">
            <div className="heading">Dashboard</div>
            <div className="filter">{/* <Filters /> */}</div>
          </div>

          {expenses.length === 0 && income.length === 0 ? (
            <RollBackScreen />
          ) : (
            <>
              <div className="dashboard-container">
                <FinancialSummaryCard
                  title="Total Balance"
                  icon={<FiCreditCard className="icon" size={18} />}
                  extra="Across all accounts"
                  amount={totalBalance}
                />

                <FinancialSummaryCard
                  title="Income"
                  amount={totalIncome}
                  change={12}
                  changeType="increase"
                  icon={<RxArrowTopRight size={18} className="text-increase" />}
                />

                <FinancialSummaryCard
                  title="Expenses"
                  amount={totalExpenses}
                  change={8}
                  changeType="decrease"
                  icon={
                    <RxArrowBottomRight size={18} className="text-decrease" />
                  }
                />

                <FinancialSummaryCard
                  title="Budget Left"
                  amount={budgetLeft}
                  progress={budgetLeftPercentage}
                  extra="65% of monthly budget used"
                  icon={<FaRegClock className="icon" />}
                />
              </div>

              <div className="chart-wrapper">
                <div className="chart-container">
                  <LineChartComponent />
                </div>
                <div className="chart-container">
                  <PieChartComponent />
                </div>
              </div>

              <div cstyle={{ marginTop: "20px" }}>
                <BarChartComponent />
              </div>

              <div className="chart-wrapper" style={{ marginTop: "20px" }}>
                <SavingsGoal />
                <QuickActions />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
