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
    title: "Add new task component",
    text: <AnatomyCard code={ TaskInputCode }>This is the TaskInput component</AnatomyCard>,
    selector: ".new-todo",
    position: "top",
    type: "click"
  }, {
    title: "Existing task component",
    text: <AnatomyCard code={ TaskCode }>This is the Task component</AnatomyCard>,
    selector: ".task-0",
    position: "right",
    type: "click"

  }, {
    title: "Filters component",
    text: <AnatomyCard code={ TaskFiltersCode }>This is the TaskFilters component</AnatomyCard>,
    selector: ".filters",
    position: "left",
    type: "click"
  }, {
    title: "A filter component",
    text: <AnatomyCard code={ FilterCode }>This is the Filter component</AnatomyCard>,
    selector: ".active-filter",
    position: "bottom",
    type: "click"
  }
];

const Tour = props => (
        <Joyride run={ true }
                 steps={ tourSteps }
                 type="continuous" />
);

export default Tour
