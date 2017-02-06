import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoTextInput extends React.Component {
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
      this.props.onTodoEntered(this.state.value);
    }
  }
};
TodoTextInput.propTypes = {
  onTodoEntered: React.PropTypes.func,
  value: React.PropTypes.string
}
TodoTextInput.defaultProps = {
  value: ""
};

const Task = props => {
  const todoText =
        props.isCompleted
          ? "DONE - " + props.value
          : props.value;
  return (
    <div>
      <input type="checkbox"
             value={props.isCompleted}
             onChange={() => props.onTaskCompleted(props.id)} />
      <TodoTextInput value={todoText}
                     onTodoEntered={text => props.onTaskChanged(props.id, text)} />
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
      newTodoText: "",
      todos: [
        { id: 1, text: "Buy Milk", isCompleted: false }
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
          <h2>todos</h2>
        </div>
        <TodoTextInput onTodoEntered={this._onNewTask}
                       value={this.state.newTodoText} />
        {
          this.state.todos.map(todo =>
            <Task key={todo.id}
                  id={todo.id}
                  value={todo.text}
                  isCompleted={todo.isCompleted}
                  onTaskChanged={this._onTaskChanged}
                  onTaskCompleted={this._onTaskCompleted}
                  onTaskDeleted={this._onTaskDeleted} />
          )
        }
      </div>
    );
  }

  _onNewTask(todoText) {
    this.setState({
      todos: this.state.todos.concat([
        { id: Date.now(), text: todoText, isCompleted: false }
      ])
    });
  }

  _onTaskChanged(id, text) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.text = text;
        }
        return todo;
      })
    });
  }

  _onTaskCompleted(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    });
  }

  _onTaskDeleted(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });

  }
}

export default App;
