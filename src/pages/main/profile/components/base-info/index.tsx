import React, {useEffect, useMemo, useState} from "react";
import Card from "@/components/card";
import {Button, Cascader, Descriptions, Form, Input, notification} from "antd";
import {UpdateUserInfoParams, updateUserProfileRequest} from "@/services/user.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/use-redux.ts";
import {fetchCurrentUserProfile} from "@/store/user";

const BaseInfo: React.FC = () => {
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()

  const userProfile = useAppSelector(state => state.user)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (isEdit) {
      form.setFieldValue('username', userProfile.username)
      form.setFieldValue('website', userProfile.website)
      form.setFieldValue('career', userProfile.career)
      form.setFieldValue('company', userProfile.company)
      form.setFieldValue('city', userProfile.city)
      form.setFieldValue('description', userProfile.description)
    }
  }, [userProfile, isEdit]);

  const profileDescription = useMemo(() => {
    return [
      {
        label: '邮箱',
        children: userProfile.email || <span className='text-zinc-400'>未设置</span>,
        span: 3
      },
      {
        label: '用户名',
        children: userProfile.username || <span className='text-zinc-400'>未设置</span>,
        span: 3
      },
      {
        label: '个人网站',
        children: userProfile.website || <span className='text-zinc-400'>未设置</span>,
        span: 3
      },
      {
        label: '职业',
        children: userProfile.career || <span className='text-zinc-400'>未设置</span>,
        span: 3
      },
      {
        label: '公司',
        children: userProfile.company || <span className='text-zinc-400'>未设置</span>,
        span: 3
      },
      {
        label: '城市',
        children: userProfile.city || <span className='text-zinc-400'>未设置</span>,
        span: 3
      },
      {
        label: '个人简介',
        children: userProfile.description || <span className='text-zinc-400'>未设置</span>,
        span: 3
      }
    ]
  }, [userProfile])

  const updateUserProfile = () => {
    form.validateFields().then((values: UpdateUserInfoParams) => {
      const {id, ...rest} = values
      updateUserProfileRequest({
        id: userProfile.id,
        ...rest
      }).then(() => {
        notification.success({
          message: '用户信息修改成功'
        })
        dispatch(fetchCurrentUserProfile())
        setIsEdit(false)
      })
    })

  }

  return (
      <Card title='个人资料' extractRender={
        isEdit ?
            <Button onClick={updateUserProfile} type='primary' size='small'>
              保存
            </Button>
            :
            <button onClick={() => setIsEdit(true)} className='bg-transparent'>
              <i className="bi bi-pencil-square text-primary"></i>
            </button>
      }>
        <div className='px-5 mt-1'>
          {
            isEdit ?
                <Form form={form} className='pb-1 mt-3' labelCol={{span: 5}}>
                  <Form.Item label='用户名' name='username'>
                    <Input placeholder='请输入用户名(非必填)'/>
                  </Form.Item>
                  <Form.Item label='个人网站' name='website' rules={[{
                    type: 'url'
                  }]}>
                    <Input placeholder='请输入个人网站地址(非必填)'/>
                  </Form.Item>
                  <Form.Item label='职业' name='career'>
                    <Input placeholder='请输入职业(非必填)'/>
                  </Form.Item>
                  <Form.Item label='公司' name='company'>
                    <Input placeholder='请输入公司名称(非必填)'/>
                  </Form.Item>
                  <Form.Item label='城市' name='city'>
                    <Cascader placeholder='请选择城市(非必填)'/>
                  </Form.Item>
                  <Form.Item label='个人简介' name='description'>
                    <Input.TextArea placeholder='请选择个人简介(非必填)' rows={4}/>
                  </Form.Item>

                </Form>
                :
                <Descriptions items={profileDescription}/>

          }


        </div>
      </Card>
  )
}

export default BaseInfo