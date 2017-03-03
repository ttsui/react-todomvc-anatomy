/* eslint-disable import/no-webpack-loader-syntax */
import React from "react";
import Joyride from "react-joyride";
import AnatomyCard from "./AnatomyCard";
import TaskInputCode from "!raw-loader!./TaskInput.js";
import TaskCode from "!raw-loader!./Task.js";
import TaskFiltersCode from "!raw-loader!./TaskFilters.js";
import FilterCode from "!raw-loader!./Filter.js";

import "react-joyride/lib/react-joyride-compiled.css";

const tourSteps = [{
    title: "<TaskInput />",
    text: <AnatomyCard code={ TaskInputCode }>
            Users enter new tasks with the TaskInput component.
          </AnatomyCard>,
    selector: ".new-todo",
    position: "top",
    type: "click"
  }, {
    title: "<Task />",
    text: <AnatomyCard code={ TaskCode }>
            Existing tasks are rendered with the Task component.
          </AnatomyCard>,
    selector: ".task-0",
    position: "right",
    type: "click"

  }, {
    title: "<TaskFilters />",
    text: <AnatomyCard code={ TaskFiltersCode }>
            The TaskFilters component contains all the filters.
          </AnatomyCard>,
    selector: ".filters",
    position: "right",
    type: "click"
  }, {
    title: "<Filter />",
    text: <AnatomyCard code={ FilterCode }>
            This is the Filter component.
          </AnatomyCard>,
    selector: ".active-filter",
    position: "bottom",
    type: "click"
  }
];

class Tour extends React.Component {

  render() {
    return (
      <Joyride run={ this.props.run }
               ref="joyride"
               steps={ tourSteps }
               type="continuous"
               callback={ data => {
                 if (data.type === "finished") {
                   this.refs.joyride.reset();
                 }
               }} />
    );
  }
}
Tour.propTypes = {
  run: React.PropTypes.bool
};
Tour.defaultProps = {
  run: false
};

export default Tour
