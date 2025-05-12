import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const exportDataToExcel = (expense, income) => {
  const transactions = expense || [];
  console.log("🚀 ~ exportDataToExcel ~ transactions:", transactions);

  const incomes = income || [];

  const transactionSheet = XLSX.utils.json_to_sheet(transactions);
  const incomeSheet = XLSX.utils.json_to_sheet(incomes);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, transactionSheet, "Transactions");
  XLSX.utils.book_append_sheet(workbook, incomeSheet, "Incomes");
  XLSX.writeFile(workbook, "finance-storage.xlsx");
};

// Basic function with minimal dependencies
export const exportDataToPDF = (expenses, incomes) => {
  // Just using raw jsPDF without the autotable plugin
  const doc = new jsPDF();

  // Fetch data
  const expenseData = expenses || [];
  const incomeData = incomes || [];

  // Add title
  doc.setFontSize(20);
  doc.text("Financial Report", 105, 15, { align: "center" });

  // Calculate summary
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  // Add summary text
  doc.setFontSize(12);
  doc.text("Summary:", 20, 30);
  doc.text(`Total Income: ₹${totalIncome}`, 20, 40);
  doc.text(`Total Expenses: ₹${totalExpense}`, 20, 50);
  doc.text(`Balance: ₹${balance}`, 20, 60);

  // Manual expense list
  doc.setFontSize(14);
  doc.text("Expenses:", 20, 80);

  let y = 90;
  expenseData.forEach((expense) => {
    doc.setFontSize(10);
    doc.text(
      `${expense.date} - ${expense.category} - ₹${expense.amount}`,
      20,
      y
    );
    y += 10;
  });

  // Manual income list
  doc.setFontSize(14);
  doc.text("Income:", 20, y + 10);

  y += 20;
  incomeData.forEach((income) => {
    doc.setFontSize(10);
    doc.text(`${income.date} - ${income.category} - ₹${income.amount}`, 20, y);
    y += 10;
  });

  doc.save("financial-report-minimal.pdf");
};
