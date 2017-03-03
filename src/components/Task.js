import React from "react";
import TaskInput from "./TaskInput";

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
      <div className={ this.props.className + (this.state.isEditing ? "editing" : "") }>
        <input className="toggle"
               onChange={() => this.props.onTaskCompleted(this.props.id)}
               type="checkbox"
               checked={ this.props.isCompleted } />
        {
          this.state.isEditing
            ? <TaskInput value={ this.props.value }
                         onTaskEntered={ this._onTaskChanged }
                         className="edit"
                         focusInput={true} />
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
  className: React.PropTypes.string,
  id: React.PropTypes.number.isRequired,
  isCompleted: React.PropTypes.bool.isRequired,
  onTaskChanged: React.PropTypes.func.isRequired,
  onTaskCompleted: React.PropTypes.func.isRequired,
  onTaskDeleted: React.PropTypes.func.isRequired,
  value: React.PropTypes.string
};
Task.defaultProps = {
  className: ""
};

export default Task
