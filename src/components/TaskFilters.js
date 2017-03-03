import React from "react";
import Filter from "./Filter";

export const FILTER_TYPE = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

const TaskFilters = props => {
  function onFilterClick(filterType) {
    props.onFilterChanged(filterType);
  }

  return (
    <ul className="filters">
      <li>
        <Filter type={ FILTER_TYPE.ALL }
                value={ props.value }
                onClick={ onFilterClick }>All</Filter>
      </li>
      <li className="active-filter">
        <Filter type={ FILTER_TYPE.ACTIVE }
                value={ props.value }
                onClick={ onFilterClick }>Active</Filter>
      </li>
      <li>
        <Filter type={ FILTER_TYPE.COMPLETED }
                value={ props.value }
                onClick={ onFilterClick }>Completed</Filter>
      </li>
    </ul>
  );
}
TaskFilters.propTypes = {
  onFilterChanged: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};

export default TaskFilters;
