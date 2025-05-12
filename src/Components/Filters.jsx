import React, { useState } from "react";
import "../assets/filters.css";
import { filters } from "../Utils/GeneralUtils";

const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  return (
    <div className="filter-parent">
      {filters?.map((filter) => (
        <button
          onClick={() => setSelectedFilter(filter)}
          className={`filter-btn ${selectedFilter?.key === filter?.key ? "active" : "inactive"}`}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
};
export default Filters;
