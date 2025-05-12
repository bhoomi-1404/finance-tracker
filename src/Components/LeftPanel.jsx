import React, { useState } from "react";
import { leftPanelRoutes } from "../Utils/GeneralUtils";
import "../assets/leftPannel.css";
import "../assets/general.css";
import { useNavigate, useLocation } from "react-router-dom";
const LeftPanel = () => {
  const [routeSelected, setRouteSelected] = useState(leftPanelRoutes[0]);
  console.log("🚀 ~ LeftPanel ~ routeSelected:", routeSelected);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="left-panel-container">
        <div
          className="logo"
          style={{ marginBottom: "1.5rem", fontWeight: "700" }}
        >
          ExpenseTracker
        </div>
        {leftPanelRoutes?.map((route) => {
          const isSelected = location.pathname === route.route;

          return (
            <div
              key={route.key}
              onClick={() => {
                navigate(route.route);
                setRouteSelected(route);
              }}
              className={`option ${isSelected ? "selected" : "not-selected"}`}
            >
              <div className="icon">{route.icon}</div>
              <div
                className={`text ${isSelected ? "selected" : "not-selected"}`}
              >
                {route.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="vertical-line" />
    </div>
  );
};
export default LeftPanel;
