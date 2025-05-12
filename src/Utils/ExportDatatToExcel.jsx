import * as XLSX from "xlsx";

export const exportDataToExcel = () => {
  // 1. Fetch data from localStorage
  const transactions = JSON.parse(localStorage.getItem("expenses")) || [];
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];

  // 2. Convert each data set to a worksheet
  const transactionSheet = XLSX.utils.json_to_sheet(transactions);
  const incomeSheet = XLSX.utils.json_to_sheet(incomes);

  // 3. Create a new workbook and append both sheets
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, transactionSheet, "Transactions");
  XLSX.utils.book_append_sheet(workbook, incomeSheet, "Incomes");

  // 4. Export workbook to Excel file
  XLSX.writeFile(workbook, "finance-storage.xlsx");
};
