import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Select, Space, Switch, TreeSelect} from "antd";
import IconList from "@/components/icon-list";
import {MenuFormParams, updateMenuRequest} from "@/services/admin/menu.ts";
import useLoading from "@/hooks/use-loading.ts";
import {CUDialogProps} from "@/hooks/use-cu-dialog.ts";
import useMenuTreeSelectOptions from "@/hooks/use-menu-tree-select-options.ts";
import Card from "@/components/card";

interface Props extends ChangeOneFiledToRequired<CUDialogProps<MenuFormParams>, 'submitCallback'> {
}


const EditForm: React.FC<Props> = (props) => {

  useEffect(() => {
    const {name, iconclass, parent, path, visible, enable} = props.data
    form.setFieldValue('name', name)
    form.setFieldValue('iconclass', iconclass)
    form.setFieldValue('path', path)
    form.setFieldValue('parent', parent || 'root')
    form.setFieldValue('visible', visible)
    form.setFieldValue('enable', enable)
  }, [props.data])

  const menuTree = useMenuTreeSelectOptions();

  const [showCover, setShowCover] = useState(true)
  useEffect(() => {
    setShowCover(!props.updateId)
  }, [props.updateId])


  const [form] = Form.useForm();

  const loading = useLoading();

  const submit = () => {
    form.validateFields().then((values: MenuFormParams) => {
      const parent = values.parent === 'root' ? null : values.parent
      loading.setState(true)
      updateMenuRequest({
        id: props.updateId,
        name: values.name,
        path: values.path,
        parent: parent,
        iconclass: values.iconclass,
        enable: values.enable,
        visible: values.visible
      }).then(() => {
        message.success("修改成功")
      }).finally(() => {
        props.submitCallback();
        loading.setState(false)
      })
    })
  }

  return (
      <Card title='修改菜单项'>
        <div className='relative rounded-md overflow-hidden p-3'>
          {
              showCover &&
              <div className='absolute top-0 left-0 bg-gray-50 w-full h-full z-10 flex items-center justify-center'>
                <p className='text-gray-400'>请在右侧选择要修改的菜单项</p>
              </div>
          }
          <Form form={form} labelCol={{span: 3}}>
            <Form.Item label='父菜单' name='parent' initialValue={'root'} rules={[{required: true}]}>
              <TreeSelect
                  placeholder='请选择父菜单'
                  treeData={menuTree}
                  fieldNames={{
                    value: 'key',
                    label: 'name',
                  }}
              />
            </Form.Item>
            <Form.Item label='名称' name='name' rules={[{required: true}]}>
              <Input placeholder='请输入菜单名称'/>
            </Form.Item>
            <Form.Item label='路径' name='path' rules={[{required: true}]}>
              <Input placeholder='请输入菜单路径'/>
            </Form.Item>
            <Form.Item label='图标' name='iconclass' rules={[{required: true, message: '请选择图标'}]}>
              <Space>
                <div className='w-9 mr-2 aspect-square border flex items-center justify-center'>
                  <i className={Form.useWatch('iconclass', form)}/>
                </div>
                <Select placeholder='选择菜单图标' style={{width: '340px'}} dropdownRender={
                  () => {
                    return <IconList onClick={
                      (icon) => {
                        form.setFieldValue('iconclass', icon)
                      }
                    }/>
                  }
                }
                />
              </Space>
            </Form.Item>
            <Form.Item label='启用' name='enable' initialValue={true} required valuePropName="checked">
              <Switch/>
            </Form.Item>
            <Form.Item label='可见' name='visible' initialValue={true} required valuePropName="checked">
              <Switch/>
            </Form.Item>
          </Form>
          <div className=''>
            <Button onClick={submit} type='primary' loading={loading.state}>提交</Button>
          </div>
        </div>
      </Card>
  )
}

export default EditForm