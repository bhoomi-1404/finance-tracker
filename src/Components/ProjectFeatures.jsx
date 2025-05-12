import React from "react";
import { infoCardsData } from "../Utils/GeneralUtils";
const ProjectFeatures = () => {
  return (
    <div>
      <div className="power-feature-wrapper ">
        <div className="power-feature-heading">
          Powerful Features to Manage Your Finances
        </div>

        <div className="card-wrapper">
          {infoCardsData?.map((card, key) => (
            <div key={key} className="feature-card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-header">{card.header}</div>
              <div className="card-description">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};
export default ProjectFeatures;
