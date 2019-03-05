import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
`;

export default class Room extends Component {
  render() {
    return <Container />;
  }
}
