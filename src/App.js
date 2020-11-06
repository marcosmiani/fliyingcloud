import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Row, Col } from 'antd';
import styled, { keyframes } from 'styled-components';
import TokenModal from './Tokens';
import tokens from './Tokens/state';

export const store = configureStore({
  reducer: combineReducers({ tokens })
})

const AppWrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const AppHeader = styled.header`

`

const spinKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spinKeyframe} infinite 20s linear;
  }
`

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Row justify="center">
          <Col span={16}>
            <AppHeader>
              Welcome to the fliying cloud
            </AppHeader>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={16}>
            <AppLogo src={logo} className="App-logo" alt="logo" />
          </Col>
        </Row>
        <TokenModal />
      </AppWrapper>
    </Provider>
  );
}

export default App;
