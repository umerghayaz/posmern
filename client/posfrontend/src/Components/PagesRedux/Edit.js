import React, { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getUserid, updateUser } from '../Redux/Features/createAction';
import { useDispatch,useSelector } from 'react-redux';
import {
    Form,
    Input,
    Card,
    Button,
    message,Upload
  } from "antd";
const Edit = () => {
    let [form] = Form.useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = useParams()
  useEffect(() => {
    dispatch(getUserid(id.id))
   
  }, [id]);
  const { users, loading, searchData ,error} = useSelector((state) => state.app);

  useEffect(() => {
    form.setFieldsValue({
      'name':users.name, 'email': users.email,'gender':users.gender

    })
    console.log(users.name,users.gender,users.email)
  }, [users.name,users.gender,users.email])
  const onFinish = (values) => {
    console.log('Success:', values,id.id);
    dispatch(updateUser( { id: id.id, values: values }))
   
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
 form={form}
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
   name="gender"
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

export default Edit
