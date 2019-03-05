import React from 'react';

const StartScreen = props => {
  const onChangePseudo = ({ target: { value } }) => {
    console.log('test');
    props.putInputPseudo(value);
  };

  const setPseudo = ({ keyCode }) => {
    keyCode === 13 && props.setPseudo(props.inputPseudo);
  };

  return (
    <div>
      <h1>Entrez votre pseudo</h1>
      <input type="text" onChange={onChangePseudo} onKeyDown={setPseudo} />
    </div>
  );
};

export default StartScreen;
