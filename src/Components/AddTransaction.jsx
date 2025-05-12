import React from "react";
import ReactModal from "react-modal";
import "../assets/general.css";
import "../assets/addTransaction.css";
import AddExpense from "./AddExpense";
import AddNewIncome from "./AddNewIncome";
const AddTransaction = ({
  setIsAddTrasanctionModalOpen,
  isAddTrasanctionModalOpen,
  activeTab,
  setActiveTab,
}) => {
  return (
    <>
      <ReactModal
        isOpen={isAddTrasanctionModalOpen}
        onRequestClose={() => setIsAddTrasanctionModalOpen(false)}
      >
        <div className="heading"> Add New Transaction</div>
        <div className="text-sm" style={{ marginBottom: "1rem" }}>
          Enter the details of you transaction/income below
        </div>
        <div>
          <div className="tabList">
            <button
              className={`tab-btn ${activeTab === "Expense" ? "active" : ""}`}
              onClick={() => setActiveTab("Expense")}
            >
              Expense
            </button>
            <button
              className={`tab-btn ${activeTab === "Income" ? "active" : ""}`}
              onClick={() => setActiveTab("Income")}
            >
              Income
            </button>
          </div>
          {activeTab === "Expense" ? (
            <AddExpense
              setIsAddTrasanctionModalOpen={setIsAddTrasanctionModalOpen}
            />
          ) : (
            <AddNewIncome
              setIsAddTrasanctionModalOpen={setIsAddTrasanctionModalOpen}
            />
          )}
        </div>
      </ReactModal>
    </>
  );
};
export default AddTransaction;
