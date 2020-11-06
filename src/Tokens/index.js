import { Form, Input, Button, Modal, Tooltip } from 'antd'
import { KeyOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { accuWeatherToken, tequilaKiwiToken, modal } from './state'

const OpenButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

function Header () {
  const dispatch = useDispatch()

  const accuWeatherTokenState = useSelector(state => state.tokens.accuWeatherToken)
  const tequilaKiwiTokenState = useSelector(state => state.tokens.tequilaKiwiToken)

  const onFinish = values => {
    dispatch(accuWeatherToken.actions.set(values.accuWeatherToken))
    dispatch(tequilaKiwiToken.actions.set(values.tequilaKiwiToken))
    dispatch(modal.actions.close())
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const showModal = () => {
    dispatch(modal.actions.open())
  }

  const handleClose = () => {
    dispatch(modal.actions.close())
  }

  return (
    <>
      <Modal
        visible={useSelector(state => state.tokens.modal)}
        title='Set tokens'
        onCancel={handleClose}
        footer={null}
      >
        <Form
          {...layout}
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='AccuWeather Token'
            name='accuWeatherToken'
            rules={[{ required: true, message: 'Please input your accuWeather token!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Tequila Kiwi Token'
            name='tequilaKiwiToken'
            rules={[{ required: true, message: 'Please input your tequila wiki token!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Tooltip title='set up token keys' placement='left'>
        <OpenButton
          danger={
            !accuWeatherTokenState || !tequilaKiwiTokenState
          }
          type='primary'
          shape='circle'
          size='large'
          icon={<KeyOutlined />}
          onClick={showModal}
        />
      </Tooltip>
    </>
  )
}

export default Header
