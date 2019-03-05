import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  height: 500px;
  border: solid black 1px;
`;

const ScreenTchat = props => {
  return (
    <Container>
      {props.messagesList.map(message => {
        return (
          <div id={Date.now()}>
            {message.pseudo} : {message.message}
          </div>
        );
      })}
    </Container>
  );
};

export default ScreenTchat;
