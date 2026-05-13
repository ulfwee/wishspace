import React from 'react';

import './FilterBar.css';

const FilterBar = ({

  searchTerm,
  setSearchTerm,

  priorityFilter,
  setPriorityFilter,

  statusFilter,
  setStatusFilter

}) => {

  return (

    <div className="filterBar">

      <div className="searchWrapper">

        <input

          type="text"

          placeholder="Search items..."

          className="input"

          value={searchTerm}

          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }

        />

      </div>

      <select

        className="select"

        value={priorityFilter}

        onChange={(e) =>
          setPriorityFilter(
            e.target.value
          )
        }

      >

        <option value="all">
          All Priorities
        </option>

        <option value="high">
          High
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="low">
          Low
        </option>

      </select>

      <select

        className="select"

        value={statusFilter}

        onChange={(e) =>
          setStatusFilter(
            e.target.value
          )
        }

      >

        <option value="all">
          All Status
        </option>

        <option value="reserved">
          Reserved
        </option>

        <option value="available">
          Available
        </option>

      </select>

    </div>
  );
};

export default FilterBar;