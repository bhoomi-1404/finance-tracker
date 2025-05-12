import React from "react";
import { GoHome } from "react-icons/go";
import { IoWalletOutline } from "react-icons/io5";
import { RiPieChartLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { parseISO, getISOWeek, getYear } from "date-fns";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { LuWallet } from "react-icons/lu";
import { IoAnalyticsOutline } from "react-icons/io5";
import { TbTransactionRupee } from "react-icons/tb";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
export const leftPanelRoutes = [
  {
    key: 1,
    title: "Dashboard",
    route: "/dashboard",
    icon: <GoHome />,
  },
  {
    key: 2,
    title: "Transaction",
    route: "/transactions",
    icon: <IoWalletOutline />,
  },
  {
    key: 3,
    title: "Budget",
    route: "/budget",
    icon: <RiPieChartLine />,
  },
  {
    key: 4,
    title: "Reports",
    route: "/reports",
    icon: <VscGraph />,
  },
  {
    key: 5,
    title: "Settings",
    route: "/settings",
    icon: <IoSettingsOutline />,
  },
];
export const filters = [
  {
    key: 1,
    title: "Daily",
  },
  {
    key: 2,
    title: "Weekly",
  },
  {
    key: 3,
    title: "Monthly",
  },
];
export const tabListForReports = [
  {
    key: 1,
    title: "Spending",
  },
  {
    key: 2,
    title: "Income",
  },
  {
    key: 3,
    title: "Categories",
  },
  {
    key: 4,
    title: "Saving Goals",
  },
];
export const incomeCategories = [
  { label: "Salary", value: "Salary" },
  { label: "Freelance", value: "Freelance" },
  { label: "Investments", value: "Investments" },
  { label: "Gifts", value: "Gifts" },
  { label: "Refunds", value: "Refunds" },
  { label: "Other", value: "Other" },
];
export const categories = [
  { value: "Food_Dining", label: "Food and Dining" },
  { value: "Housing", label: "Housing" },
  { value: "Transportation", label: "Transportation" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Shopping", label: "Shopping" },
  { value: "Utilities", label: "Utilities" },
  { value: "Travel", label: "Travel" },
  { value: "Education", label: "Education" },
  { value: "Personal_Care", label: "Personal Care" },
  { value: "Miscellaneous", label: "Miscellaneous" },
];
export const paymentMethods = [
  { label: "Cash", value: "Cash" },
  { label: "Credit Card", value: "Credit Card" },
  { label: "Debit Card", value: "Debit Card" },
  { label: "UPI", value: "UPI" },
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "Digital Wallet", value: "Digital Wallet" },
  { label: "Other", value: "Other" },
];
export const CATEGORY_COLORS = [
  { key: "Food_Dining", value: "#6A5ACD" },
  { key: "Housing", value: "#DC143C" },
  { key: "Transportation", value: "#FF8C00" },
  { key: "Entertainment", value: "#20B2AA" },
  { key: "Shopping", value: "#4169E1" },
  { key: "Utilities", value: "#8A2BE2" },
  { key: "Healthcare", value: "#228B22" },
  { key: "Miscellaneous", value: "#FF69B4" },
  { key: "Travel", value: "#ffff66" },
  { key: "Education", value: "#000099" },
  { key: "Personal_Care", value: "#333300" },
];
export const budgetCategories = [
  { value: "Overall_Budget", label: "Overall Budget" },
  { value: "Food_Dining", label: "Food and Dining" },
  { value: "Housing", label: "Housing" },
  { value: "Transportation", label: "Transportation" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Shopping", label: "Shopping" },
  { value: "Utilities", label: "Utilities" },
  { value: "Travel", label: "Travel" },
  { value: "Education", label: "Education" },
  { value: "Personal_Care", label: "Personal Care" },
  { value: "Miscellaneous", label: "Miscellaneous" },
];
export const goalOptions = [
  { label: "Savings", value: "savings" },
  { label: "Investment", value: "investment" },
  { label: "Retirement", value: "retirement" },
  { label: "Travel", value: "travel" },
  { label: "Education", value: "education" },
  { label: "Home", value: "home" },
  { label: "Other", value: "other" },
];
export const timeFrames = [
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Yearly", label: "Yearly" },
  { value: "Daily", label: "Daily" },
];
export function creatingPieChartData(expense) {
  const grouped = {};

  expense?.forEach((exp) => {
    if (!exp?.category) return;

    const category = exp.category;
    const colorObj = CATEGORY_COLORS.find((c) => c.key === category);
    const color = colorObj?.value || "#ccc";

    if (grouped[category]) {
      grouped[category].value += exp.amount;
    } else {
      grouped[category] = {
        name: category,
        value: exp.amount,
        color,
      };
    }
  });

  return Object.values(grouped);
}
export const creatingLineChartData = (expense) => {
  return expense?.map((exp) => {
    const date = new Date(exp.date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return {
      name: `${month} ${year}`,
      amount: exp.amount,
    };
  });
};
export const totalSpentExcludingOverall = (budget, expenses) => {
  return budget
    .filter((b) => b.category !== "Overall Budget")
    .reduce((total, b) => {
      const categorySpend = expenses
        .filter((e) => e.category === b.category)
        .reduce((sum, e) => sum + e.amount, 0);
      return total + categorySpend;
    }, 0);
};
export const getCategorizedBudgetSummary = (expenses, budgets) => {
  console.log("🚀 ~ getCategorizedBudgetSummary ~ budgets:", budgets);

  return budgets
    .filter((budget) => budget.category !== "Overall Budget")
    .map((budget) => {
      const spent = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0);

      const percentageUsed = (spent / budget.total) * 100;

      let color;
      if (percentageUsed >= 90) {
        color = "#EF4444"; // Red
      } else if (percentageUsed >= 70) {
        color = "#F59E0B"; // Orange
      } else {
        color = "#22C55E"; // Green
      }

      return {
        category: budget.category,
        total: budget.total,
        spent,
        color,
      };
    });
};
export const getCategorizedBudgetSummaryForOverBudget = (expenses, budgets) => {
  return budgets.map((budget) => {
    let spent = 0;

    if (budget.category === "Overall Budget") {
      // Sum only expenses that match other budget categories (not all expenses)
      const validCategories = budgets
        .filter((b) => b.category !== "Overall Budget")
        .map((b) => b.category);

      spent = expenses
        .filter((expense) => validCategories.includes(expense.category))
        .reduce((sum, e) => sum + e.amount, 0);
    } else {
      // Normal category spending
      spent = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0);
    }

    const percentageUsed = (spent / budget.total) * 100;

    let color;
    if (percentageUsed >= 90) {
      color = "#EF4444"; // Red
    } else if (percentageUsed >= 70) {
      color = "#F59E0B"; // Orange
    } else {
      color = "#22C55E"; // Green
    }

    return {
      category: budget.category?.split("_")?.join(" "),
      total: budget.total,
      spent,
      color,
    };
  });
};

export const getWeeklyExpenseData = (expenses) => {
  const weeklyMap = {};

  expenses.forEach((expense) => {
    const date = parseISO(expense.date);
    const week = getISOWeek(date);
    const year = getYear(date);
    console.log("🚀 ~ expenses.forEach ~ year:", year, date, week);

    const weekKey = `${year}-W${week}`;

    if (!weeklyMap[weekKey]) {
      weeklyMap[weekKey] = 0;
    }

    weeklyMap[weekKey] += expense.amount;
  });
  console.log("🚀 ~ expenses.forEach ~ weeklyMap:", weeklyMap);

  return Object.entries(weeklyMap).map(([week, amount]) => ({
    week,
    amount,
  }));
};
export const getMonthlyCategoryData = (expenses) => {
  const categoryMap = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const monthKey = `${month} ${year}`;

    if (!categoryMap[monthKey]) {
      categoryMap[monthKey] = { month: monthKey };
    }

    const catKey = expense.category.toLowerCase();

    if (!categoryMap[monthKey][catKey]) {
      categoryMap[monthKey][catKey] = 0;
    }

    categoryMap[monthKey][catKey] += expense.amount;
  });

  // Convert to array for Recharts
  return Object.values(categoryMap);
};
export const goalColors = [
  "#4ade80", // green
  "#60a5fa", // blue
  "#f472b6", // pink
  "#facc15", // yellow
  "#f87171", // red
  "#a78bfa", // purple
  "#34d399", // teal
];
export const tablistForSettings = [
  {
    key: "1",
    title: "Preferences",
    icon: <IoSettingsOutline />,
  },
  {
    key: "2",
    title: "Account",
    icon: <MdOutlineAccountCircle />,
  },
  {
    key: "3",
    title: "Export Data",
    icon: <GoDatabase />,
  },
];

export const infoCardsData = [
  {
    key: 1,
    icon: <IoAnalyticsOutline />,
    header: "Expense Analytics",
    description:
      "Visualize your spending patterns with interactive charts and graphs.",
  },
  {
    key: 2,
    icon: <LuWallet />,
    header: "Budget Planning",
    description:
      "Set monthly budgets and track your progress to financial goals.",
  },
  {
    key: 3,
    icon: <TbTransactionRupee />,
    header: "Transaction History",
    description:
      "Keep all your transactions organized in one place with automatic categorization.",
  },
  {
    key: 4,
    icon: <RiMoneyRupeeCircleLine />,
    header: "Financial Goals",
    description: "Set saving targets and track your journey to achieving them.",
  },
];
