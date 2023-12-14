import SmogBg from "@/assets/images/cloud-bg.png";
import {Button, Form, Input} from "antd";
import React from "react";

const ForgotPasswordPage: React.FC = () => {

  const [form] = Form.useForm();

  const submit = () => {

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

              <h2 className='text-lg font-bold'>忘记密码</h2>


              <Form form={form} layout='vertical' className='mt-6'>
                <Form.Item label='邮箱地址' name='email' rules={[
                  {
                    type: 'email',
                    required: true,
                  }
                ]}>
                  <Input placeholder='请输入邮箱地址'/>
                </Form.Item>
              </Form>

              <Button onClick={submit} type='primary' className='w-full mt-3' size='large'>发送验证码</Button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ForgotPasswordPage