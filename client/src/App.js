import React, { Component } from 'react';
import styled from 'styled-components';
import ScreenTchat from './components/ScreenTchat';
import StartScreen from './components/StartScreen';
import CreateRoom from './components/CreateRoom';

import './App.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  state = {
    chatState: 'LOGIN',
  };
  changeChatState = state => {
    this.setState({ chatState: state });
  };

  render() {
    const chatStates = {
      LOGIN: <StartScreen changeChatState={this.changeChatState} />,
      CHAT: <ScreenTchat changeChatState={this.changeChatState} />,
      CREATE_ROOM: <CreateRoom changeChatState={this.changeChatState} />,
    };
    return (
      <div className="App">
        <Container>{chatStates[this.state.chatState]}</Container>
      </div>
    );
  }
}

export default App;
