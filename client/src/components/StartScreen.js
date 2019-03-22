import React from 'react';
import { registerPseudo } from '../services/socket';

class StartScreen extends React.Component {
  state = {
    inputValue: '',
  };

  changeInput = ({ target: { value: inputValue } }) => {
    this.setState({ inputValue });
  };

  setPseudo = ({ keyCode }) => {
    const { inputValue } = this.state;
    if (keyCode === 13) {
      if (inputValue.length) {
        registerPseudo(inputValue);
      } else {
        registerPseudo(Date.now());
      }
      this.props.changeChatState('CHAT');
    }
  };

  render = () => {
    return (
      <div>
        <h1>Entrez votre pseudo</h1>
        <input
          type="text"
          onChange={this.changeInput}
          onKeyDown={this.setPseudo}
          value={this.state.inputValue}
        />
      </div>
    );
  };
}

export default StartScreen;
