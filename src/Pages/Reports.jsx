import React, { useState } from "react";
import TopBar from "../Components/TopBar";
import { useUIStore } from "../Store/useExpenses";
import "../assets/addTransaction.css";
import LeftPanel from "../Components/LeftPanel";
import "../assets/general.css";
import "../assets/dashboard.css";
import { tabListForReports } from "../Utils/GeneralUtils";
import SpendingTrendsGraph from "../Components/SpendingTrendsGraph";
import BarChartComponent from "../Components/BarChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
import "../assets/reports.css";
import IncomeAnalysis from "../Components/IncomeAnalysis";
import CategoryTrends from "../Components/CategoryTrends";
import SavingGoal from "../Components/SavingGoal";
import CreateNewGoal from "../Components/CreateNewGoal";
import { useExpenses } from "../Store/useExpenses";
import RollBackScreen from "../Components/RollBackScreen";
const Reports = () => {
  const { isPanelCollapsed } = useUIStore();
  const [activeTab, setActiveTab] = useState("Spending");
  const [openCreateGoalModal, setOpenCreateGoalModal] = useState(false);
  const expenses = useExpenses((state) => state.expenses);
  const incomes = useExpenses((state) => state.incomes);
  console.log("🚀 ~ Reports ~ activeTab:", activeTab);

  return (
    <div style={{ height: "100vh" }}>
      <TopBar />
      <div className={!isPanelCollapsed ? "container" : "collapsed-container"}>
        {!isPanelCollapsed ? <LeftPanel /> : <></>}
        <div className="data-container" style={{ overflowX: "hidden" }}>
          <div className="header">
            <div className="heading">Reports & Analysis</div>
            <div className="primary-btn">
              <button
                className="primary-btn"
                onClick={() => {
                  setOpenCreateGoalModal(!openCreateGoalModal);
                }}
              >
                Add New Goal
              </button>
            </div>
          </div>
          {expenses.length === 0 && incomes.length === 0 ? (
            <RollBackScreen />
          ) : (
            <>
              <div className="tabList" style={{ marginTop: "1.5rem" }}>
                {tabListForReports?.map((tab) => (
                  <button
                    className={`tab-btn ${activeTab === tab.title ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.title)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              {activeTab === "Spending" && (
                <div className="heading" style={{ marginTop: "1.5rem" }}>
                  Spending Overview
                </div>
              )}

              {activeTab === "Spending" && (
                <>
                  <div className="spending-trends-graph">
                    <SpendingTrendsGraph />
                  </div>
                  <div
                    className="chart-wrapper"
                    style={{ marginTop: "1.5rem" }}
                  >
                    <div className="chart-container">
                      <BarChartComponent />
                    </div>
                    <div className="chart-container">
                      <PieChartComponent />
                    </div>
                  </div>
                </>
              )}
              {activeTab === "Income" && (
                <div className="spending-trends-graph">
                  <IncomeAnalysis />
                </div>
              )}
              {activeTab === "Categories" && (
                <div className="spending-trends-graph">
                  <CategoryTrends />
                </div>
              )}
              {activeTab === "Saving Goals" && (
                <div className="spending-trends-graph">
                  <SavingGoal />
                </div>
              )}
            </>
          )}

          {openCreateGoalModal && (
            <CreateNewGoal
              openCreateGoalModal={openCreateGoalModal}
              setOpenCreateGoalModal={setOpenCreateGoalModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Reports;
