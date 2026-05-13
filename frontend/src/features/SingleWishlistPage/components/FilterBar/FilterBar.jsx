import React from 'react';
import './FilterBar.css'

const FilterBar = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-10">
      <div className="relative flex-grow">
        <input 
          type="text" 
          placeholder="Search items..." 
          className="w-full bg-white border border-[#C2D8C4] rounded-xl px-4 py-3 focus:outline-none focus:border-[#385144]"
        />
      </div>
      <select className="bg-white border border-[#C2D8C4] rounded-xl px-4 py-3 min-w-[150px] focus:outline-none">
        <option>All Priorities</option>
        <option>High</option>
        <option>Medium</option>
      </select>
      <select className="bg-white border border-[#C2D8C4] rounded-xl px-4 py-3 min-w-[150px] focus:outline-none">
        <option>All Status</option>
        <option>Reserved</option>
        <option>Available</option>
      </select>
    </div>
  );
};

export default FilterBar;