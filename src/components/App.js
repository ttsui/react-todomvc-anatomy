import React, { Component } from "react";
import Box from "react-layout-components";
import TaskInput from "./TaskInput";
import Task from "./Task";
import TaskFilters, { FILTER_TYPE } from "./TaskFilters";
import Tour from "./Tour";
import SwitchButton from "react-switch-button";
import 'react-switch-button/dist/react-switch-button.css';

import "../styles/base.css";
import "../styles/index.css";
import "../styles/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      filter: FILTER_TYPE.ALL,
      showingAnatomy: false,
      tasks: [
        { id: 1, description: "Buy Milk", isCompleted: false }
      ]
    };

    this._byFilterType = this._byFilterType.bind(this);
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onNewTask = this._onNewTask.bind(this);
    this._onTaskChanged = this._onTaskChanged.bind(this);
    this._onTaskCompleted = this._onTaskCompleted.bind(this);
    this._onTaskDeleted = this._onTaskDeleted.bind(this);
    this._toggleShowingAnatomy = this._toggleShowingAnatomy.bind(this);
  }

  render() {
    return (
      <Box center column>
        <Box minWidth={ 230 }
             maxWidth={ 550 }
             width="100%" >
          <section className="todoapp">
            <header className="header">
              <h1 style={{}}>todos</h1>
              <TaskInput onTaskEntered={this._onNewTask}
                         value=""
                         className="new-todo" />
            </header>
            <section className="main" style={{ display: "block" }} >
              <ul className="todo-list">
                {
                  this.state.tasks
                    .filter(this._byFilterType)
                    .map((task, idx) =>
                      <li key={task.id}
                          className={ task.isCompleted ? "completed" : "" }>
                        <Task id={task.id}
                              value={task.description}
                              isCompleted={task.isCompleted}
                              onTaskChanged={this._onTaskChanged}
                              onTaskCompleted={this._onTaskCompleted}
                              onTaskDeleted={this._onTaskDeleted}
                              className={ "task-" + idx } />
                      </li>
                    )
                }
              </ul>
            </section>
            <footer className="footer">
              <TaskFilters onFilterChanged={ this._onFilterChanged }
                           value={ this.state.filter }/>
            </footer>
          </section>
        </Box>
        <Box>
          <SwitchButton label="Reveal anatomy"
                        checked={ this.state.showingAnatomy }
                        onChange={ this._toggleShowingAnatomy }/>
          <Tour run={ this.state.showingAnatomy }
                onFinished={ this._toggleShowingAnatomy }/>
        </Box>
      </Box>
    );
  }

  _byFilterType(task) {
    switch (this.state.filter) {
      case FILTER_TYPE.ALL:
        return true;
      case FILTER_TYPE.ACTIVE:
        return task.isCompleted === false;
      case FILTER_TYPE.COMPLETED:
        return task.isCompleted === true;
      default:
        return true;
    }
  }

  _onFilterChanged(filter) {
    this.setState({
      filter
    });
  }

  _onNewTask(description) {
    this.setState({
      tasks: this.state.tasks.concat([
        { id: Date.now(), description, isCompleted: false }
      ])
    });
  }

  _onTaskChanged(id, description) {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === id) {
          task.description = description;
        }
        return task;
      })
    });
  }

  _onTaskCompleted(id) {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      })
    });
  }

  _onTaskDeleted(id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    });
  }

  _toggleShowingAnatomy() {
    this.setState({ showingAnatomy: !this.state.showingAnatomy });
  }
}

export default App;
