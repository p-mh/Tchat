import React from 'react';
import { emitMessage } from '../services/socket.js';
class InputTchat extends React.Component {
  state = {
    inputValue: '',
  };

  putInputValue = inputValue => {
    this.setState({ inputValue });
  };

  sendMessage = () => {
    if (this.state.inputValue.length) {
      const { currentRoom } = this.props;
      const { inputValue: message } = this.state;
      emitMessage(currentRoom, message);
      this.setState({
        inputValue: '',
      });
    }
  };

  changeInputValue = ({ target: { value } }) => {
    this.putInputValue(value);
  };

  keyDownInput = e => {
    if (e.keyCode === 13) {
      this.sendMessage(this.state.inputValue);
      e.value = '';
    }
  };

  render = () => {
    return (
      <div>
        <input
          type="text"
          placeholder="Tapez votre message"
          onChange={this.changeInputValue}
          onKeyDown={this.keyDownInput}
          value={this.state.inputValue}
        />
      </div>
    );
  };
}

export default InputTchat;
