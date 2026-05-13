import React from 'react';
import './FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filterBar">
      <div className="searchWrapper">
        <input type="text" placeholder="Search items..." className="input" />
      </div>
      <select className="select">
        <option>All Priorities</option>
        <option>High</option>
        <option>Medium</option>
      </select>
      <select className="select">
        <option>All Status</option>
        <option>Reserved</option>
        <option>Available</option>
      </select>
    </div>
  );
};

export default FilterBar;