import React, {useEffect, useState} from "react";
import SmogBg from "@/assets/images/cloud-bg.png";
import {Button, Checkbox, Form, Input, notification} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {getCaptchaRequest, SignInFormParams, signInRequest} from "@/services/auth/auth.ts";
import {useAppDispatch} from "@/hooks/use-redux.ts";
import {fetchMenuTree, setToken} from "@/store/main";
import {setUserInfo} from "@/store/user";

const LoginPage: React.FC = () => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getCaptcha();
  }, [])

  const [captcha, setCaptcha] = useState('')

  const getCaptcha = () => {
    getCaptchaRequest().then((res) => {
      setCaptcha(res.data.captcha)
    })
  }

  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then((values: SignInFormParams) => {
      signInRequest({
        email: values.email,
        password: values.password,
        captchaCode: values.captchaCode
      }).then(res => {

        notification.success({
          message: '登陆成功'
        })
        dispatch(setToken(res.data.token))
        dispatch(setUserInfo(res.data.userInfo))

        dispatch(fetchMenuTree())

        navigate('/main')
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
              <h2 className='text-center mt-3 text-lg'>登陆</h2>


              <Form form={form} layout='vertical' className='mt-6'>
                <Form.Item label='邮箱地址' name='email' rules={[
                  {
                    type: 'email',
                    required: true,
                  }
                ]}>
                  <Input placeholder='请输入邮箱地址'/>
                </Form.Item>
                <Form.Item label='密码' name='password' rules={[{required: true,}]}>
                  <Input placeholder='请输入密码'/>
                </Form.Item>
                <Form.Item
                    label={
                      <div className='flex items-center justify-between w-96'>
                        <span>验证码</span>
                        <span className='text-xs text-zinc-400 -mr-3'>点击图片刷新</span>
                      </div>
                    }
                    name='captchaCode'
                    rules={[{required: true, message: '请输入验证码'}]}
                >
                  <div className='flex items-center justify-between'>
                    <Input placeholder='请输入验证码' className='flex-grow mr-3 h-10'/>
                    <div className='bg-gray-100 rounded w-56 cursor-pointer'>
                      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(captcha)}`} alt='二维码'/>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item name='remember' valuePropName='checked'>
                  <div className='flex items-center justify-between'>
                    <Checkbox>记住密码?</Checkbox>
                    <Link to={'to'} className='ml-1 text-primary hover:underline text-sm'>忘记密码</Link>
                  </div>
                </Form.Item>
              </Form>

              <Button onClick={submit} type='primary' className='w-full' size='large'>登陆</Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage