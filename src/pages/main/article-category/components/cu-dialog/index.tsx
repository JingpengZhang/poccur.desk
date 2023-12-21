import React, {useEffect} from "react";
import {Form, Input, Modal, notification} from "antd";
import {CUDialogProps} from "@/hooks/use-cu-dialog.ts";
import {
  ArticleCategoryFormParams,
  createArticleCategoryRequest,
  updateArticleCategoryRequest
} from "@/services/client/article-category.ts";
import useLoading from "@/hooks/use-loading.ts";

interface Props extends ChangeOneFiledToRequired<CUDialogProps<ArticleCategoryFormParams>, 'submitCallback'> {

}

const CUDialog: React.FC<Props> = (props) => {

  useEffect(() => {
    if (props.visible) {
      const {name, alias, description} = props.data
      form.setFieldValue('name', name);
      form.setFieldValue('alias', alias);
      form.setFieldValue('description', description);
    }
  }, [props.data, props.visible])


  const [form] = Form.useForm();

  const loading = useLoading();

  const onRequestFinish = () => {
    props.submitCallback();
    form.resetFields();
    props.closeDialog();
    loading.setState(false)
  }

  const submit = () => {
    form.validateFields().then((values: ArticleCategoryFormParams) => {
      loading.setState(true)

      if (props.mode === 'create') {
        createArticleCategoryRequest({
          name: values.name,
          alias: values.alias,
          description: values.description
        }).then(() => {
          notification.success({
            message: '分类创建成功'
          })
        }).finally(() => {
          onRequestFinish();
        })
      } else {
        updateArticleCategoryRequest({
          id: props.updateId,
          name: values.name,
          alias: values.alias,
          description: values.description
        }).then(() => {
          notification.success({
            message: '分类修改成功'
          })
        }).finally(() => {
          onRequestFinish();
        })
      }
    })
  }

  const onCancel = () => {
    form.resetFields();
    props.closeDialog();
  }

  return (
      <Modal open={props.visible} title={props.title} onCancel={onCancel} onOk={submit} confirmLoading={loading.state}>
        <div className='py-4'>
          <Form form={form} labelCol={{span: 4}}>
            <Form.Item label='名称' name='name' rules={[{required: true}]}>
              <Input placeholder='请输入分类名称'/>
            </Form.Item>
            <Form.Item label='别名' name='alias' rules={[{required: true}]}>
              <Input placeholder='请输入分类别名,作为分类路径使用'/>
            </Form.Item>
            <Form.Item label='描述' name='description' rules={[{required: true}]}>
              <Input.TextArea rows={4} placeholder='请输入分类描述.'/>
            </Form.Item>
          </Form>
        </div>
      </Modal>
  )
}

export default CUDialog