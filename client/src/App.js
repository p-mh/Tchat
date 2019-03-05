import React, { Component } from 'react';
import styled from 'styled-components';
import { emitMessage, receiveMessage } from './services/socket.js';
import InputTchat from './components/InputTchat';
import ScreenTchat from './components/ScreenTchat';
import StartScreen from './components/StartScreen';
import Room from './components/Room';
import './App.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const addMessageToList = message => prevState => ({
  messagesList: [...prevState.messagesList, message],
});

class App extends Component {
  state = {
    inputValue: '',
    messagesList: [],
    isLog: false,
    inputPseudo: '',
    pseudo: '',
  };

  componentDidMount = () => {
    receiveMessage(message => {
      this.setState(addMessageToList(message));
    });
  };

  putInputValue = inputValue => {
    this.setState({ inputValue });
  };

  sendMessage = message => {
    emitMessage(message);
  };

  putInputPseudo = inputPseudo => {
    this.setState({ inputPseudo });
  };

  setPseudo = pseudo => {
    this.setState({ pseudo, isLog: true });
  };

  render() {
    const {
      inputValue,
      messagesList,
      isLog,
      inputPseudo,
      pseudo,
      isInRoom,
    } = this.state;
    const displayStartScreen = !isLog && (
      <StartScreen
        putInputPseudo={this.putInputPseudo}
        setPseudo={this.setPseudo}
        inputPseudo={inputPseudo}
      />
    );
    //const displayRooms = isLog && <Room />;
    const displayTchat = isLog && (
      <div>
        <ScreenTchat messagesList={messagesList} />
        <InputTchat
          putInputValue={this.putInputValue}
          sendMessage={this.sendMessage}
          inputValue={inputValue}
          pseudo={pseudo}
        />
      </div>
    );
    return (
      <div className="App">
        <Container>
          {displayStartScreen}
          {displayTchat}
        </Container>
      </div>
    );
  }
}

export default App;
