import React, {useEffect} from "react";
import {Form, Input, Modal, notification} from "antd";
import {CUDialogProps} from "@/hooks/use-cu-dialog.ts";
import FormItem from "antd/es/form/FormItem";
import {createTagRequest, TagFormParams, updateTagRequest} from "@/services/tag.ts";

interface Props extends ChangeOneFiledToRequired<CUDialogProps<TagFormParams>, 'submitCallback'> {
}

const CUDialog: React.FC<Props> = (props) => {

  useEffect(() => {
    if (props.visible) {
      form.setFieldValue('name', props.data.name)
    }
  }, [props.visible, props.data]);

  const [form] = Form.useForm()

  const submit = () => {
    form.validateFields().then((value: TagFormParams) => {
      if (props.mode === 'create') {
        createTagRequest({
          name: value.name
        }).then(() => {
          notification.success({
            message: '标签创建成功'
          })
          props.submitCallback()
          onCancel()
        })
      } else {
        updateTagRequest({
          id: props.updateId,
          name: value.name
        }).then(() => {
          notification.success({
            message: '标签修改成功'
          })
          props.submitCallback()
          onCancel()
        })
      }
    })
  }


  const onCancel = () => {
    props.closeDialog()
    form.resetFields()
  }

  return (
      <Modal open={props.visible} title={props.title} onOk={submit} onCancel={onCancel}>
        <Form form={form}>
          <FormItem label='标签名' name='name' rules={[
            {required: true}
          ]}>
            <Input placeholder='请输入标签名'/>
          </FormItem>
        </Form>
      </Modal>
  )
}

export default CUDialog