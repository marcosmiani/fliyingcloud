import React from 'react'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Layout, Card } from 'antd'
import styled from 'styled-components'
import TokenModal from './Tokens'
import SearchBox from './Searchbox'
import tokens from './Tokens/state'

const { Header, Footer, Content } = Layout

export const store = configureStore({
  reducer: combineReducers({ tokens })
})

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: calc(100vw - 100px);
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AppHeader = styled(Header)`
  background-color: white;
  color: black;
  height: auto;
  width: 100%;
  padding-top: 20px;
`

const AppContent = styled(Content)`
  background-color: white;
  color: black;
  width: 100%;
`

function App () {
  return (
    <Provider store={store}>
      <AppWrapper>
        <AppHeader>
          <SearchBox />
        </AppHeader>
        <AppContent>
          {new Array(4).fill('').map((value, index) => (
            <Card key={index} title='Card title' bordered={false} style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          ))}
        </AppContent>
        <Footer>Footer</Footer>
        <TokenModal />
      </AppWrapper>
    </Provider>
  )
}

export default App
