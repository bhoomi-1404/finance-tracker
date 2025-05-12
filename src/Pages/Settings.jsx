import React, { useState } from "react";
import TopBar from "../Components/TopBar";
import { useUIStore } from "../Store/useExpenses";
import LeftPanel from "../Components/LeftPanel";
import { tablistForSettings } from "../Utils/GeneralUtils";
import Preferences from "../Components/Preferences";
import Account from "../Components/Account";
import ExportData from "../Components/ExportData";
const Settings = () => {
  const { isPanelCollapsed } = useUIStore();
  const [activeTab, setActiveTab] = useState("Preferences");
  return (
    <div style={{ height: "100vh" }}>
      <TopBar />
      <div className={!isPanelCollapsed ? "container" : "collapsed-container"}>
        {!isPanelCollapsed ? <LeftPanel /> : <></>}
        <div className="data-container" style={{ overflowX: "hidden" }}>
          <div className="header">
            <div className="heading">Settings</div>
          </div>
          <div className="tabList" style={{ marginTop: "1.5rem" }}>
            {tablistForSettings?.map((tab) => (
              <button
                className={`tab-btn ${activeTab === tab.title ? "active" : ""}`}
                onClick={() => setActiveTab(tab.title)}
              >
                <div>{tab.icon}</div>
                <div>{tab.title}</div>
              </button>
            ))}
          </div>

          {activeTab === "Preferences" && (
            <div>
              <Preferences />
            </div>
          )}
          {activeTab === "Account" && (
            <div>
              <Account />
            </div>
          )}
          {activeTab === "Export Data" && <ExportData />}
        </div>
      </div>
    </div>
  );
};
export default Settings;
