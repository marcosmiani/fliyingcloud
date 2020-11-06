import logo from './logo.svg';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import styled, { keyframes } from 'styled-components';

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
    <AppWrapper>
      <Row justify="center">
        <Col span={16}>
          <AppHeader>
            Welcome to the fliying cloud
          </AppHeader>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AppLogo src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button type="primary">Button</Button>
        </Col>
      </Row>
    </AppWrapper>
  );
}

export default App;
