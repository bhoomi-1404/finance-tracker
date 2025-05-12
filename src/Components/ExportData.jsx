import React, { useState } from "react";
import "../assets/exportData.css";
import { exportDataToPDF, exportDataToExcel } from "../Utils/exportFilesUtil";
import { useExpenses } from "../Store/useExpenses";
import { ImBin } from "react-icons/im";
import ConfirmationModal from "./ConfirmationModal";
const ExportData = () => {
  const [selectedExportData, setSelectedExportData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { resetTransactions, resetAllFinanceData } = useExpenses();
  const [bodyText, setBodyText] = useState("");
  const [onClickAction, setOnClickAction] = useState("");
  const expense = useExpenses((state) => state.expenses);
  const income = useExpenses((state) => state.incomes);
  const handleExport = () => {
    if (selectedExportData === "excel") {
      exportDataToExcel(expense, income);
    } else if (selectedExportData === "pdf") {
      exportDataToPDF(expense, income);
    }
  };
  const handleClearAllTransactions = () => {
    resetTransactions();
  };
  const handleResetData = () => {
    localStorage.removeItem("finance-storage"); // Clear persisted store
    resetAllFinanceData();
  };
  return (
    <div>
      {" "}
      <div className="preferences-container">
        <div className="heading">Export Data</div>
        <div className="text-sm">Export your data for backup</div>
        <div className="text-color">Export Data</div>
        <div className="export-data-wrapper">
          <button
            className={`export-data-item ${selectedExportData === "excel" ? "selected" : ""}`}
            onClick={() => {
              setSelectedExportData("excel");
            }}
          >
            Excel (.xlsx)
          </button>
          <button
            className={`export-data-item ${selectedExportData === "pdf" ? "selected" : ""}`}
            onClick={() => setSelectedExportData("pdf")}
          >
            PDF
          </button>
        </div>

        <div className="button-wrapper">
          <button className="primary-btn" onClick={() => handleExport()}>
            Export Data
          </button>
        </div>
      </div>
      <div className="preferences-container">
        <div className="danger-heading">Danger Zone</div>
        <div className="text-sm" style={{ marginTop: "10px" }}>
          Irreversible actions that affect your data
        </div>

        <div className="danger-zone-button">
          <button
            className="secondary-danger-zone-btn"
            onClick={() => {
              setIsModalOpen(true);
              setBodyText("clear all transactions");
              setOnClickAction("clearAllTransactions");
            }}
          >
            <ImBin />
            Clear All Transactions
          </button>
          <button
            className="primary-danger-zone-btn"
            onClick={() => {
              setIsModalOpen(true);
              setBodyText("reset all data");
              setOnClickAction("restData");
            }}
          >
            <ImBin />
            Reset All Data
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          bodyText={bodyText}
          onClickAction={
            onClickAction === "restData"
              ? handleResetData
              : handleClearAllTransactions
          }
        />
      )}
    </div>
  );
};
export default ExportData;
