/* eslint-disable import/no-webpack-loader-syntax */
import React from "react";
import Joyride from "react-joyride";
import FilterCode from "!raw-loader!./Filter.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/styles";

import "react-joyride/lib/react-joyride-compiled.css";

const tourSteps = [{
    title: "Add new task component",
    text: "This is the TaskInput component",
    selector: ".new-todo",
    position: "top",
    type: "click"
  }, {
    title: "Existing task component",
    text: "This is a Task component",
    selector: ".task-0",
    position: "right",
    type: "click"

  }, {
    title: "Filters component",
    text: "This is a TaskFilters component",
    selector: ".filters",
    position: "left",
    type: "click"
  }, {
    title: "A filter component",
    text: <SyntaxHighlighter language="javascript" style={docco}>{FilterCode}</SyntaxHighlighter>,
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
