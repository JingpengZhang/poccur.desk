import React, {useState} from "react";
import Card from "@/components/card";
import {Button, Cascader, Descriptions, Form, Input} from "antd";

const BaseInfo: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
      <Card title='个人资料' extractRender={
        isEdit ?
            <Button type='primary' size='small'>
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
                <Form className='pb-1 mt-3'>
                  <Form.Item label='用户名'>
                    <Input placeholder='请输入用户名'/>
                  </Form.Item>
                  <Form.Item label='职业'>
                    <Input placeholder='请输入职业'/>
                  </Form.Item>
                  <Form.Item label='城市'>
                    <Cascader placeholder='请选择城市'/>
                  </Form.Item>
                  <Form.Item label='个人简介'>
                    <Input.TextArea placeholder='请选择个人简介' rows={4}/>
                  </Form.Item>

                </Form>
                :
                <Descriptions items={[
                  {
                    key: 1,
                    label: '用户名',
                    children: 'JingpengZhang',
                    span: 3
                  },
                  {
                    key: 2,
                    label: '邮箱',
                    children: 'jingpeng_zhang@foxmail.com',
                    span: 3
                  },
                  {
                    key: 3,
                    label: '职业',
                    children: 'Front-end Developer',
                    span: 3
                  }
                ]}/>

          }


        </div>
      </Card>
  )
}

export default BaseInfo