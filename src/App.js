import React from 'react'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import { Layout } from 'antd'
import styled from 'styled-components'
import TokenModal from './Tokens'
import Search from './Search'
import Locations from './Locations'
import { createStore } from './store'

const { Header, Footer, Content } = Layout

export const store = createStore()

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
  width: 100%;
`

const AppFooter = styled(Footer)`
  background-color: white;
  color: black;
  width: 100%;
  margin-top: 20px;
  text-align: center;
`

function App () {
  return (
    <Provider store={store}>
      <AppWrapper>
        <AppHeader>
          <Search />
        </AppHeader>
        <AppContent>
          <Locations />
        </AppContent>
        <AppFooter>Special thanks to the Free API's dudes</AppFooter>
        <TokenModal />
      </AppWrapper>
    </Provider>
  )
}

export default App
