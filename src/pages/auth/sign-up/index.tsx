import React, {useEffect} from "react";
import SmogBg from "@/assets/images/cloud-bg.png";
import {Button, Form, Input, notification} from "antd";
import {SignUpParams, signUpRequest} from "@/services/auth/auth.ts";
import {Role} from "@/libs/role.enum.ts";
import useSignInCallback from "@/hooks/use-sign-in-callback.ts";
import {useNavigate} from "react-router-dom";
import {getSystemConfigRequest} from "@/services/admin";

const SignUpPage: React.FC = () => {

  useEffect(() => {
    getSystemConfigRequest().then(res => {
      if (res.data.superExist) {
        notification.success({
          message: '站长账号已存在,请登陆',
        })
        navigate('/sign-in')
      }
    })
  }, [])


  const navigate = useNavigate()

  const signInCallBack = useSignInCallback()

  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then((values: SignUpParams & { confirmPassword: string }) => {

      if (values.password !== values.confirmPassword) {
        return form.setFields([{
          errors: ['密码不一致,请重新输入'],
          name: 'confirmPassword',
        }])
      }

      signUpRequest({
        email: values.email,
        password: values.password,
        username: values.username,
        autoSignIn: true,
        roles: [Role.Super]
      }).then((res) => {
        notification.success({
          message: '注册成功,已自动登陆'
        })
        signInCallBack.run(res.data)
        navigate('/')
      })
    })
  }

  return (
      <div className='w-screen h-screen bg-blue-100'>
        <div
            style={{
              backgroundImage: `url(${SmogBg})`
            }}
            className='w-full h-full bg-cover'>
          <div className='h-full w-full bg-[rgba(0,0,0,0)] flex items-center justify-center'>
            <div className='rounded-md bg-white p-8 w-96 shadow'>

              <h1 className='font-bold text-lg text-center '>POCCUR</h1>
              <h2 className='text-center mt-3 text-lg'>注册</h2>


              <Form form={form} layout='vertical' className='mt-6'>
                <Form.Item label='用户名' name='username' rules={[
                  {
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,16}$/,
                    message: '用户名仅能含中文、大小写字母、和数字,且在2至16个字符之间'
                  }
                ]}>
                  <Input placeholder='请输入用户名(非必填)'/>
                </Form.Item>
                <Form.Item label='邮箱地址' name='email' rules={[
                  {
                    type: 'email',
                    required: true,
                  }
                ]}>
                  <Input placeholder='请输入邮箱地址'/>
                </Form.Item>
                <Form.Item label='密码' name='password' rules={[
                  {required: true,},
                  {
                    pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
                    message: '密码格式不正确,长度最少8位,且至少包含一个字母和一个数字'
                  }
                ]}>
                  <Input.Password placeholder='请输入密码'/>
                </Form.Item>
                <Form.Item label='确认密码' name='confirmPassword' rules={[
                  {required: true,},
                ]}>
                  <Input.Password placeholder='请再次输入密码'/>
                </Form.Item>
              </Form>

              <Button onClick={submit} type='primary' className='w-full mt-3' size='large'>注册</Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignUpPage