import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportDataToPDF = () => {
  const doc = new jsPDF();

  // Fetch data
  const transactions = JSON.parse(localStorage.getItem("expenses")) || [];
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];

  // Helper to convert object arrays to [headers, rows]
  const formatTable = (data) => {
    if (data.length === 0) return [["No data"], []];
    const headers = Object.keys(data[0]);
    const rows = data.map((item) => headers.map((key) => item[key]));
    return [headers, rows];
  };

  // Transactions Table
  const [txnHeaders, txnRows] = formatTable(transactions);
  doc.text("Transactions", 14, 15);
  doc.autoTable({
    startY: 20,
    head: [txnHeaders],
    body: txnRows,
  });

  // Incomes Table (start after last table ends)
  const finalY = doc.lastAutoTable.finalY || 30;
  const [incHeaders, incRows] = formatTable(incomes);
  doc.text("Incomes", 14, finalY + 10);
  doc.autoTable({
    startY: finalY + 15,
    head: [incHeaders],
    body: incRows,
  });

  // Save the PDF
  doc.save("finance-data.pdf");
};
