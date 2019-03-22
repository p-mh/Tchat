import React, { Component } from 'react';
import { createRoom } from '../services/socket';

export default class CreateRoom extends Component {
  state = {
    inputValue: '',
  };
  changeInputValue = ({ target: { value: inputValue } }) => {
    this.setState({
      inputValue,
    });
  };
  createRoom = () => {
    createRoom(this.state.inputValue);
    this.props.changeChatState('CHAT');
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.changeInputValue}
        />
        <button onClick={this.createRoom.bind(this)}>Create</button>
      </div>
    );
  }
}
