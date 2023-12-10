import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Select, Space, TreeSelect} from "antd";
import IconList from "@/components/icon-list";
import {getMenuTreeRequest, updateMenuRequest} from "@/services/menu.ts";
import AntdUtils from "@/utils/antd-utils.ts";
import useLoading from "@/hooks/use-loading.ts";
import * as NProgress from "nprogress";
import {CUDialogProps} from "@/hooks/use-cu-dialog.ts";

interface FormValues {
  name: string,
  path: string,
  iconclass: string,
  parent: string
}

interface Props extends ChangeOneFiledToRequired<CUDialogProps<{
  name: string;
  iconclass: string;
  path: string;
  parent: string
}>, 'submitCallback'> {
}


const EditForm: React.FC<Props> = (props) => {

  useEffect(() => {
    const {name, iconclass, parent, path} = props.data
    form.setFieldValue('name', name)
    form.setFieldValue('iconclass', iconclass)
    form.setFieldValue('path', path)
    form.setFieldValue('parent', parent || 'root')
  }, [props.data])

  const [showCover, setShowCover] = useState(true)
  useEffect(() => {
    setShowCover(!props.updateId)
  }, [props.updateId])

  useEffect(() => {
    getMenuTree()
  }, [])

  const [menuTree, setMenuTree] = useState<any[]>()

  const getMenuTree = () => {
    getMenuTreeRequest().then(res => {
      const {menuTree} = res.data
      const treeData = AntdUtils.treeDataAddKeyBy(menuTree, 'id')

      setMenuTree([{
        key: 'root',
        name: '根菜单',
        children: treeData
      }])
    })
  }

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
      updateMenuRequest({
        id: props.updateId,
        name: values.name,
        path: values.path,
        parent: parent,
        iconclass: values.iconclass
      }).then(() => {
        message.success("修改成功")
      }).finally(() => {
        props.submitCallback();
        NProgress.done();
        loading.setState(false)
      })
    })
  }

  return (
      <div className='w-full border rounded-md mt-4 p-3'>
        <p className='mt-1 mb-3 px-3 font-bold'>修改菜单项</p>
        <div className='relative rounded-md overflow-hidden p-3'>
          {
              showCover &&
              <div className='absolute top-0 left-0 bg-gray-100 w-full h-full z-10 flex items-center justify-center'>
                <p className='text-gray-400'>请在右侧选择要修改的菜单项</p>
              </div>
          }
          <Form form={form} labelCol={{span: 3}}>
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
          <div className=''>
            <Button onClick={submit} type='primary' loading={loading.state}>提交</Button>
          </div>
        </div>
      </div>
  )
}

export default EditForm