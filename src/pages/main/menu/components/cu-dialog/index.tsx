import React, {useEffect, useState} from "react";
import {Form, Input, message, Modal, Select, Space, TreeSelect} from "antd";
import IconList from "@/components/icon-list";
import {createMenuRequest} from "@/services/menu.ts";
import * as NProgress from "nprogress";
import useLoading from "@/hooks/use-loading.ts";
import {CUDialogProps} from "@/hooks/use-cu-dialog.ts";
import useMenuTreeSelectOptions from "@/hooks/use-menu-tree-select-options.ts";

interface FormValues {
  name: string,
  path: string,
  iconclass: string,
  parent: string
}

interface Props extends ChangeOneFiledToRequired<CUDialogProps<{
  parent: string | null
}>, 'submitCallback'> {
}

const CUDialog: React.FC<Props> = (props) => {

  useEffect(() => {
    form.setFieldValue('parent', props.data.parent)
  }, [props.data.parent])

  const menuTree = useMenuTreeSelectOptions();

  const [formData, setFormData] = useState({
    name: '菜单管理3',
    path: '/main/menu',
    group: false,
    iconclass: 'bi bi-tags',
    parent: ''
  })

  const [form] = Form.useForm();

  const loading = useLoading();

  const submit = () => {
    form.validateFields().then((values: FormValues) => {
      const parent = values.parent === 'root' ? null : values.parent
      NProgress.start();
      loading.setState(true)
      createMenuRequest({
        name: values.name,
        path: values.path,
        parent: parent,
        iconclass: values.iconclass
      }).then(() => {
        message.success("创建成功")
      }).finally(() => {
        props.submitCallback();
        NProgress.done();
        loading.setState(false)
        form.resetFields();
        props.closeDialogFn();
      })
    })
  }

  return (
      <Modal open={props.visible} title={props.title} onOk={submit} confirmLoading={loading.state}
             onCancel={props.closeDialogFn}>
        <div className='py-4'>
          <Form form={form} labelCol={{span: 4}}>
            <Form.Item label='父菜单' name='parent' rules={[{required: true}]}>
              <TreeSelect
                  placeholder='请选择父菜单'
                  treeData={menuTree}
                  onChange={(value) => setFormData({
                    ...formData,
                    parent: value
                  })
                  }
                  fieldNames={{
                    value: 'key',
                    label: 'name',
                  }}
              />
            </Form.Item>
            <Form.Item label='名称' name='name' rules={[{required: true}]}>
              <Input value={formData.name} placeholder='请输入菜单名称'/>
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
          </Form>
        </div>
      </Modal>
  )
}

export default CUDialog