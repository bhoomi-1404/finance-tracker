import React from "react";
import { LuWallet } from "react-icons/lu";
import "../assets/landingPageNavbar.css";
import { useTheme } from "../Store/ThemeContext";
import { MdOutlineLightMode } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const LandingPageNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        {" "}
        <header className="navbar">
          <div className="logo">
            <LuWallet />
            <div>ExpenseTracker</div>
          </div>{" "}
          <div className="nav-bar-right">
            <button
              className="button-box"
              onClick={() => toggleTheme()}
              title="Toggle theme"
            >
              {theme === "light" ? <LuMoon /> : <MdOutlineLightMode />}
            </button>
            <nav className="nav-links">
              <a href="#features">Features</a>
            </nav>
            <button className="primary-btn" onClick={() => navigate("/signup")}>
              Sign In
            </button>
          </div>
        </header>
        <div className="horizontal-line" />
      </div>

      <div className="hero-section">
        <div className="left-side">
          <div className="header-text">Take Control of Your Finances</div>
          <div className="text-md">
            Track expenses, manage budgets, and achieve your financial goals
            with our intuitive expense tracking tool.
          </div>
        </div>
        <div className="right-part">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80"
            alt="Finance Dashboard"
          />
        </div>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};
export default LandingPageNavbar;
