import React from 'react';

const InputTchat = props => {
  const onChangeInputValue = ({ target: { value } }) => {
    props.putInputValue(value);
  };

  const onKeyDownInput = e => {
    if (e.keyCode === 13) {
      props.sendMessage({ pseudo: props.pseudo, message: props.inputValue });
      e.value = '';
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tapez votre message"
        onChange={onChangeInputValue}
        onKeyDown={onKeyDownInput}
      />
    </div>
  );
};

export default InputTchat;
