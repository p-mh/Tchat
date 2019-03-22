import React from 'react';
import styled from 'styled-components';
import InputTchat from './InputTchat';
import { roomConnection, getMessage, getRooms } from '../services/socket.js';

const Container = styled.div`
  width: 500px;
  height: 500px;
  border: solid black 1px;
  text-align: left;
  padding: 20px;
`;

const addMessage = (roomName, message) => prevState => {
  const prevRoomMessages = prevState.messagesList[roomName]
    ? prevState.messagesList[roomName]
    : [];
  return {
    messagesList: {
      ...prevState.messagesList,
      [roomName]: [...prevRoomMessages, message],
    },
  };
};

class ScreenTchat extends React.Component {
  state = {
    rooms: [],
    currentRoom: 'general',
    messagesList: { general: [] },
  };
  componentDidMount = () => {
    getRooms(rooms =>
      this.setState({
        rooms,
      })
    );
    getMessage((roomName, message) => {
      this.setState(addMessage(roomName, message));
    });
  };

  joinRoom = roomName => {
    if (!this.state.messagesList[roomName]) {
      roomConnection(roomName);
    }
    this.setState({
      currentRoom: roomName,
    });
  };

  render = () => {
    const { changeChatState } = this.props;
    const { messagesList, currentRoom, rooms } = this.state;

    const showRooms = rooms.map(roomName => (
      <button key={roomName} onClick={this.joinRoom.bind(this, roomName)}>
        {roomName}
      </button>
    ));

    return (
      <div>
        <button onClick={this.joinRoom.bind(this, 'general')}>General</button>
        {showRooms}
        <button onClick={changeChatState.bind(this, 'CREATE_ROOM')}>
          Add room
        </button>
        <Container>
          {messagesList[currentRoom] &&
            messagesList[currentRoom].map(({ message, pseudo }, index) => {
              return (
                <div key={index}>
                  {pseudo && `${pseudo} :`} {message}
                </div>
              );
            })}
        </Container>
        <InputTchat currentRoom={currentRoom} />
      </div>
    );
  };
}

export default ScreenTchat;
