import { Form, Input, Button, Affix, DatePicker, InputNumber } from 'antd'
const { RangePicker } = DatePicker
// import { KeyOutlined } from '@ant-design/icons'
// import { useDispatch, useSelector } from 'react-redux'
// import styled from 'styled-components'
// import { searchFlights } from './state'

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

function Searchbox () {
  // const dispatch = useDispatch()

  // const accuWeatherTokenState = useSelector(state => state.tokens.accuWeatherToken)
  // const tequilaKiwiTokenState = useSelector(state => state.tokens.tequilaKiwiToken)

  const onFinish = values => {
    console.info(values)
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
        <Input placeholder='Amsterdam?' />
      </Form.Item>
      <Affix>
        <Form.Item
          label='Destinations'
          name='destinations'
          rules={[{ required: true, message: 'Please input your destinations!' }]}
        >
          <Input placeholder='Madrid, Paris, London..' />
        </Form.Item>
      </Affix>
      <Form.Item
        label='Dates'
        name='dates'
        rules={[{ required: true, message: 'Please input your dates!' }]}
      >
        <RangePicker />
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
            name='kids'
            rules={[{ min: 0, max: 5, type: 'number' }]}
          >
            <InputNumber
              placeholder='kids'
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Searchbox
