import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenses = create(
  persist(
    (set) => ({
      expenses: [],
      incomes: [],
      budgets: [],
      goals: [],
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),

      addIncome: (income) =>
        set((state) => ({
          incomes: [...state.incomes, income],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      deleteIncome: (id) =>
        set((state) => ({
          incomes: state.incomes.filter((i) => i.id !== id),
        })),
      editExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updatedExpense } : e
          ),
        })),

      editIncome: (id, updatedIncome) =>
        set((state) => ({
          incomes: state.incomes.map((i) =>
            i.id === id ? { ...i, ...updatedIncome } : i
          ),
        })),
      addBudget: (budget) =>
        set((state) => ({
          budgets: [...state.budgets, budget],
        })),
      editBudget: (id, updatedBudget) =>
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...updatedBudget } : b
          ),
        })),
      deleteBudget: (id) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        })),
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),

      editGoal: (id, updatedGoal) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...updatedGoal } : g
          ),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),

      resetTransactions: () =>
        set(() => ({
          expenses: [],
          incomes: [],
        })),

      resetAllFinanceData: () =>
        set(() => ({
          expenses: [],
          incomes: [],
          budgets: [],
          goals: [],
          editingTransaction: null,
        })),
      updateGoalAmount: (goalId, amountToAdd) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? { ...goal, amount: (goal.amount || 0) + amountToAdd }
              : goal
          ),
        })),

      setEditingTransaction: (txn) => set({ editingTransaction: txn }),
      clearEditingTransaction: () => set({ editingTransaction: null }),
    }),

    {
      name: "finance-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useUIStore = create((set) => ({
  isPanelCollapsed: false,
  togglePanel: () =>
    set((state) => ({ isPanelCollapsed: !state.isPanelCollapsed })),
}));
