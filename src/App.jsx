import Dashboard from "./Pages/Dashboard";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import TransactionsList from "./Pages/TransactionsList";
import Budgets from "./Pages/Budgets";
import Reports from "./Pages/Reports";
import { ThemeProvider } from "./Store/ThemeContext";
import Settings from "./Pages/Settings";
import "./assets/theme.css";
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/LandingPage";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/budget" element={<Budgets />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
