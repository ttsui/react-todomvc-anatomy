import React from "react";


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

  componentDidMount() {
    if (this.props.focusInput) {
      this._textInput.focus();
    }
  }

  render() {
    return (
      <input className={ this.props.className }
             onChange={this._onInputChange}
             onKeyPress={this._onKeyPress}
             onBlur={this._onBlur}
             placeholder="What needs to be done?"
             ref={ input => { this._textInput = input; } }
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
  focusInput: React.PropTypes.bool,
  onTaskEntered: React.PropTypes.func,
  value: React.PropTypes.string
}
TaskInput.defaultProps = {
  focusInput: false,
  value: ""
};

export default TaskInput
