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

const ListItem = props => {
  const todoText =
        props.isCompleted
          ? "DONE - " + props.value
          : props.value;
  return (
    <div>
      <input type="checkbox"
             value={props.isCompleted}
             onChange={() => props.onItemCompleted(props.id)} />
      <TodoTextInput value={todoText } />
      <button onClick={() => props.onItemDeleted(props.id)}>X</button>
    </div>
  );
}
ListItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  isCompleted: React.PropTypes.bool.isRequired,
  onItemCompleted: React.PropTypes.func.isRequired,
  onItemDeleted: React.PropTypes.func.isRequired,
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

    this._onNewTodo = this._onNewTodo.bind(this);
    this._onItemCompleted = this._onItemCompleted.bind(this);
    this._onItemDeleted = this._onItemDeleted.bind(this);
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
                      id={todo.id}
                      value={todo.text}
                      isCompleted={todo.isCompleted}
                      onItemCompleted={this._onItemCompleted}
                      onItemDeleted={this._onItemDeleted} />
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

  _onItemCompleted(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    });
  }

  _onItemDeleted(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });

  }
}

export default App;
