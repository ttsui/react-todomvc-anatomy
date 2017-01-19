import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoTextInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this._onInputChange = this._onInputChange.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
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
      this.props.onNewTodo(this.state.value);
      this.setState({ value: "" });
    }
  }
};
TodoTextInput.propTypes = {
  onNewTodo: React.PropTypes.func,
  value: React.PropTypes.string
}
TodoTextInput.defaultProps = {
  value: ""
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this._onItemCompleted = this._onItemCompleted.bind(this);
  }

  render() {
    return (
      <div>
        <input type="checkbox"
               value={this.state.isCompleted}
               onChange={this._onItemCompleted} />
        <input type="text" value={this.state.value} />
        <button>X</button>
      </div>
    );
  }

  _onItemCompleted() {
    this.setState({
      isCompleted: true
    });
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodoText: "",
      todos: [
        { id: 1, text: "Buy Milk", isCompleted: false }
      ]
    };

    this._onNewTodo = this._onNewTodo.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>todos</h2>
        </div>
        <TodoTextInput onNewTodo={this._onNewTodo}
                       value={this.state.newTodoText} />
        {
          this.state.todos.map(todo =>
            <ListItem key={todo.id}
                      value={todo.text}
                      isCompleted={todo.isCompleted}
                      onItemCompleted={() => {}} />
          )
        }
      </div>
    );
  }

  _onNewTodo(todoText) {
    this.setState({
      todos: this.state.todos.concat([
        { id: Date.now(), text: todoText, isCompleted: false }
      ])
    });
  }
}

export default App;
