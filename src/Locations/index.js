import React from 'react'
import { Card, Row, Col } from 'antd'
import styled from 'styled-components'

const CardWrapper = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0 20px;
`

const LocationCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`

function App () {
  return (
    <Row gutter={0} justify='center' wrap>
      {(['Madrid', 'Amsterdam', 'London', 'Berlin']).map((value, index) => (
        <CardWrapper key={index} className='gutter-row' xl={6} sm={12} xs={24} flex>
          <LocationCard title={value} bordered={false} loading>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </LocationCard>
        </CardWrapper>
      ))}
    </Row>
  )
}

export default App
