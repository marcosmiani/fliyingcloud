import { Form, Input, Button, InputNumber } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
// import styled from 'styled-components'
import { searchFlights } from './state'
import SelectBox from './SelectBox'

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailLayout = {
  wrapperCol: {
    xs: { offset: 0, span: 16 },
    sm: { offset: 6, span: 16 }
  }
}

function Search () {
  const dispatch = useDispatch()
  const searchLoading = useSelector(state => state.search.flights.loading)

  // const accuWeatherTokenState = useSelector(state => state.tokens.accuWeatherToken)
  // const tequilaKiwiTokenState = useSelector(state => state.tokens.tequilaKiwiToken)

  const onFinish = values => {
    console.info(values)
    dispatch(searchFlights(values))
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name='search'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size='large'
      {...layout}
    >
      <Form.Item
        label='Origin'
        name='origin'
        rules={[{ required: true, message: 'Please input your origin!' }]}
      >
        <SelectBox allowClear searchType='origins' placeholder='Amsterdam' />
      </Form.Item>
      <Form.Item
        label='Destinations'
        name='destinations'
        rules={[{ required: true, message: 'Please input your destinations!' }]}
      >
        <SelectBox allowClear searchType='destinations' searchMode='multiple' placeholder='Madrid, Paris, London..' />
      </Form.Item>
      <Form.Item label='Passengers'>
        <Input.Group compact>
          <Form.Item
            name='adults'
            rules={[{ required: true, min: 1, max: 5, type: 'number', message: 'Adults are required' }]}
          >
            <InputNumber
              placeholder='Adults'
            />
          </Form.Item>
          <Form.Item
            name='children'
            rules={[{ min: 0, max: 5, type: 'number' }]}
          >
            <InputNumber
              placeholder='kids'
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={searchLoading}
          icon={searchLoading ? <LoadingOutlined /> : <SearchOutlined />}
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Search