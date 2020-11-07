import React from 'react'
import { Card, Row, Col, List, Button, Typography } from 'antd'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { CompassOutlined, SelectOutlined } from '@ant-design/icons'

const { Title } = Typography

const CardWrapper = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 0 20px;
`

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  min-height: 350px;
  max-height: 350px;

  .ant-card-body {
    padding-left: 5px;
    padding-right: 20px;
  }

  .ant-list-pagination {
    text-align: center;
  }

  .ant-list-item-action {
    margin-left: 0;
  }
`

const FlightsContainer = styled(List)`
  min-height: 250px;
  max-height: 250px;
`

function LoadingFlights () {
  return (
    <>
      <p>Fancy flight</p>
      <p>Extra Fancy flight</p>
      <p>Cheap flight</p>
    </>
  )
}

const LoadingLocationsWrapper = styled.div`
  text-align: center;
  ${({ white }) => white ? 'color: white;' : ''}
  padding: 20px;
`

function LoadingLocations () {
  return (
    <LoadingLocationsWrapper white>
      <CompassOutlined style={{ fontSize: 20 }} />
      <p>Search some destinations!</p>
    </LoadingLocationsWrapper>
  )
}

function LocationCard ({ code }) {
  const loading = useSelector(state => get(state, `data.${code}.flights.loading`, []))
  const name = useSelector(state => get(state, `data.${code}.name`, []))
  const items = useSelector(state => get(state, `data.${code}.flights.items`, []))

  return (
    <StyledCard
      title={name}
      bordered={false}
      loading={loading}
    >
      {loading
        ? <LoadingFlights />
        : items.length !== 0 && (
          <FlightsContainer
            itemLayout='horizontal'
            size='small'
            pagination={{
              size: 'small',
              pageSize: 3
            }}
            dataSource={items}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <Button
                    key='select-flight'
                    type='link'
                    block
                    icon={<SelectOutlined />}
                    target='_blank'
                    href={item.deep_link}
                  >
                    Select
                  </Button>
                ]}
              >
                <Title level={4}>
                  {Object.keys(item.conversion)
                    .map(curr => `${item.conversion[curr]} ${curr}`)}
                </Title>
              </List.Item>
            )}
          />
        )}
      {items.length === 0 && (
        <LoadingLocationsWrapper>
          <CompassOutlined style={{ fontSize: 20 }} />
          <p>Sorry no flights for this destination!</p>
        </LoadingLocationsWrapper>
      )}
    </StyledCard>
  )
}

function Locations () {
  const dataKeys = useSelector(state => state.locations)

  return (
    <Row gutter={0} justify='center' wrap>
      {dataKeys.length !== 0 && dataKeys.map((value, index) => (
        <CardWrapper key={value} className='gutter-row' xl={6} sm={12} xs={24} flex>
          <LocationCard key={value} code={value} />
        </CardWrapper>
      ))}
      {dataKeys.length === 0 && (
        <LoadingLocations />
      )}
    </Row>
  )
}

export default Locations
