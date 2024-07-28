import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { createUser } from '../Redux/Features/createAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate= useNavigate()
  const dispatch=useDispatch()
const onFinish = (values) => {
  console.log('Success:', values);
  dispatch(createUser(values))
  navigate('/')
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 
  
};
  return (
    <div>
       <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Gender"
      name="gender+"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default CreateUser
