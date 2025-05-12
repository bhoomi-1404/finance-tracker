import React, { useState } from "react";
import TopBar from "../Components/TopBar";
import { useUIStore } from "../Store/useExpenses";
import LeftPanel from "../Components/LeftPanel";
import BudgetCards from "../Components/BudgetCards";
import ProgressLine from "../Components/ProgressLine";
import "../assets/budget.css";
import "../assets/general.css";
import { HiOutlinePlusSm } from "react-icons/hi";
import CreateBudgtet from "../Components/CreateBudget";
import { useExpenses } from "../Store/useExpenses";
import { getCategorizedBudgetSummary } from "../Utils/GeneralUtils";
import RollBackScreen from "../Components/RollBackScreen";
const Budgets = () => {
  const { isPanelCollapsed } = useUIStore();
  const [openCreateBudgetModal, setOpenCreateBudgetModal] = useState(false);
  const budget = useExpenses((state) => state.budgets);
  const expenses = useExpenses((state) => state.expenses);

  const categorizedBudget = getCategorizedBudgetSummary(expenses, budget);

  return (
    <div style={{ height: "100vh" }}>
      <TopBar />
      <div className={!isPanelCollapsed ? "container" : "collapsed-container"}>
        {!isPanelCollapsed ? <LeftPanel /> : <></>}
        <div className="data-container" style={{ overflowX: "hidden" }}>
          <div className="header">
            <div className="heading">Budget Planner</div>
            <div className="primary-btn">
              <HiOutlinePlusSm />
              <button
                className="primary-btn"
                onClick={() => setOpenCreateBudgetModal(!openCreateBudgetModal)}
              >
                Create Budget
              </button>
            </div>
          </div>
          {expenses.length === 0 ? (
            <RollBackScreen />
          ) : (
            <>
              <BudgetCards />

              <div className="progress-bar-container">
                <div className="budget-header">
                  <div className="heading">Category Budgets</div>
                  <div className="text-sm">Track your spending by category</div>
                </div>
                <div className="progress-lines">
                  {categorizedBudget.map((budget, index) => (
                    <ProgressLine
                      key={index}
                      category={budget.category}
                      spent={budget.spent}
                      total={budget.total}
                      spentColor={budget.color}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {openCreateBudgetModal && (
            <CreateBudgtet
              openCreateBudgetModal={openCreateBudgetModal}
              setOpenCreateBudgetModal={setOpenCreateBudgetModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Budgets;
