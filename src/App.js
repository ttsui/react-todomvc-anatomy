import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this._onInputChange = this._onInputChange.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(nextProps);
    }
  }

  render() {
    return (
      <input value={this.state.value}
             onChange={this._onInputChange}
             onKeyPress={this._onKeyPress}
             placeholder="What needs to be done?"/>
    );
  }

  _onInputChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  _onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.onTaskEntered(this.state.value);
    }
  }
};
TaskInput.propTypes = {
  onTaskEntered: React.PropTypes.func,
  value: React.PropTypes.string
}
TaskInput.defaultProps = {
  value: ""
};

const Task = props => {
  const description =
        props.isCompleted
          ? "DONE - " + props.value
          : props.value;
  return (
    <div>
      <input type="checkbox"
             value={props.isCompleted}
             onChange={() => props.onTaskCompleted(props.id)} />
      <TaskInput value={description}
                     onTaskEntered={description => props.onTaskChanged(props.id, description)} />
      <button onClick={() => props.onTaskDeleted(props.id)}>X</button>
    </div>
  );
}
Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  isCompleted: React.PropTypes.bool.isRequired,
  onTaskChanged: React.PropTypes.func.isRequired,
  onTaskCompleted: React.PropTypes.func.isRequired,
  onTaskDeleted: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, description: "Buy Milk", isCompleted: false }
      ]
    };

    this._onNewTask = this._onNewTask.bind(this);
    this._onTaskChanged = this._onTaskChanged.bind(this);
    this._onTaskCompleted = this._onTaskCompleted.bind(this);
    this._onTaskDeleted = this._onTaskDeleted.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>tasks</h2>
        </div>
        <TaskInput onTaskEntered={this._onNewTask}
                   value="" />
        {
          this.state.tasks.map(task =>
            <Task key={task.id}
                  id={task.id}
                  value={task.description}
                  isCompleted={task.isCompleted}
                  onTaskChanged={this._onTaskChanged}
                  onTaskCompleted={this._onTaskCompleted}
                  onTaskDeleted={this._onTaskDeleted} />
          )
        }
      </div>
    );
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
}

export default App;
