import React, { Component } from 'react';
import logo from './logo.svg';
import './base.css';
import './index.css';
import './App.css';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this._onBlur = this._onBlur.bind(this);
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
      <input className={ this.props.className }
             onChange={this._onInputChange}
             onKeyPress={this._onKeyPress}
             onBlur={this._onBlur}
             placeholder="What needs to be done?"
             value={this.state.value} />
    );
  }

 _onBlur() {
   this._triggerTaskEntered();
 }

  _onInputChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  _onKeyPress(event) {
    if (event.key === "Enter") {
      this._triggerTaskEntered();
    }
  }

  _triggerTaskEntered() {
   if (this.state.value.trim().length === 0) {
     return;
   }

   this.props.onTaskEntered(this.state.value);
  }
};
TaskInput.propTypes = {
  className: React.PropTypes.string,
  onTaskEntered: React.PropTypes.func,
  value: React.PropTypes.string
}
TaskInput.defaultProps = {
  value: ""
};

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isEditing: false
    };

    this._onLabelClick = this._onLabelClick.bind(this);
    this._onTaskChanged = this._onTaskChanged.bind(this);
  }

  render() {
    return (
      <div className={ this.state.isEditing ? "editing" : "" }>
        <input className="toggle"
               onChange={() => this.props.onTaskCompleted(this.props.id)}
               type="checkbox"
               value={ this.props.isCompleted } />
        {
          this.state.isEditing
            ? <TaskInput value={ this.props.value }
                         onTaskEntered={ this._onTaskChanged }
                         className="edit" />
            : <label onDoubleClick={ this._onLabelClick }>{ this.props.value }</label>
        }
        <button className="destroy"
                onClick={() => this.props.onTaskDeleted(this.props.id)} />
      </div>
    );
  }

  _onLabelClick(event) {
    console.log("_onLabelClick() called.")
    this.setState({ isEditing: true });
  }

  _onTaskChanged(description) {
    this.props.onTaskChanged(this.props.id, description);
    this.setState({ isEditing: false });
  }
}
Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  isCompleted: React.PropTypes.bool.isRequired,
  onTaskChanged: React.PropTypes.func.isRequired,
  onTaskCompleted: React.PropTypes.func.isRequired,
  onTaskDeleted: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
};

const FILTER_TYPE = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};
const Filter = props => {
  return (
    <a href="#"
       onClick={ () => props.onClick(props.type) }
       className={ props.value === props.type ? "selected" : "" }>
       { props.children }
    </a>
  );
};
Filter.propTypes = {
  onClick: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string
}
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
      <li>
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      filter: FILTER_TYPE.ALL,
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
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TaskInput onTaskEntered={this._onNewTask}
                     value=""
                     className="new-todo" />
        </header>
        <section className="main" style={{ display: "block" }} >
          <ul className="todo-list">
            {
              this.state.tasks
                .filter(this._byFilterType)
                .map(task =>
                  <li key={task.id}
                      className={ task.isCompleted ? "completed" : "" }>
                    <Task id={task.id}
                          value={task.description}
                          isCompleted={task.isCompleted}
                          onTaskChanged={this._onTaskChanged}
                          onTaskCompleted={this._onTaskCompleted}
                          onTaskDeleted={this._onTaskDeleted} />
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
}

export default App;
