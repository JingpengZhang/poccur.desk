import React, {useState} from "react";
import {Form, Input, Modal, Select, Space, Switch, TreeSelect} from "antd";
import IconList from "@/components/icon-list";
import {createMenuRequest} from "@/services/menu.ts";

const CUPop: React.FC = () => {

  const [formData, setFormData] = useState({
    iconclass: 'bi bi-tags'
  })

  const submit = () => {
    createMenuRequest({
      name: '菜单管理',
      path: '/main/menu',
      group: false,
      iconclass: 'bi bi-menu-app'
    }).then(res => {
      console.log(res)
    })
  }

  return (
      <Modal open={true} title='添加菜单' onOk={submit}>
        <div className='py-4'>
          <Form labelCol={{span: 4}}>
            <Form.Item label='名称' required={true}>
              <Input placeholder='请输入菜单名称'/>
            </Form.Item>
            <Form.Item label='路径' required={true}>
              <Input placeholder='请输入菜单路径'/>
            </Form.Item>
            <Form.Item label='图标' required={true}>
              <Space>
                <div className='w-9 mr-2 aspect-square border flex items-center justify-center'>
                  <i className={formData.iconclass}/>
                </div>
                <Select placeholder='选择菜单图标' style={{width: '340px'}} dropdownRender={
                  () => {
                    return <IconList onClick={
                      (icon) => {
                        setFormData({
                          ...formData, iconclass: icon
                        })
                      }
                    }/>
                  }
                }
                />
              </Space>
            </Form.Item>
            <Form.Item label='父菜单' required={true}>
              <TreeSelect placeholder='请选择父菜单(非必填)'/>
            </Form.Item>
            <Form.Item label='组' required={true}>
              <Switch/>
            </Form.Item>
          </Form>
        </div>
      </Modal>
  )
}

export default CUPop