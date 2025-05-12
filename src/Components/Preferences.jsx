import React from "react";
import "../assets/general.css";
import "../assets/settings.css";
import { FiSun } from "react-icons/fi";
import { TbMoon } from "react-icons/tb";
import { useTheme } from "../Store/ThemeContext";
const Preferences = () => {
  const { updateTheme, theme } = useTheme();
  return (
    <div className="preferences-container">
      <div className="heading">Appearance</div>
      <div className="text-sm">
        Customize how ExpenseTracker looks on your device
      </div>
      <div>
        <div className="text-color">Theme</div>
        <div className="theme-wrapper">
          {["light", "dark"].map((option) => (
            <div
              key={option}
              className={`theme-option ${theme === option ? "selected" : ""}`}
              onClick={() => updateTheme(option)}
            >
              <div
                className={`theme-icon-wrapper ${option === "light" ? "light" : "dark"}`}
              >
                <div className="theme-icon">
                  {option === "light" ? <FiSun /> : <TbMoon />}
                </div>
              </div>
              <div className="theme-label">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Preferences;
