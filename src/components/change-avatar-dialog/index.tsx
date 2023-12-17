import React from "react";
import {Button, Modal, notification, Upload} from "antd";
import ImgCrop from "antd-img-crop";
import {RcFile} from "antd/es/upload";
import {updateAvatarRequest} from "@/services/user.ts";
import {useAppDispatch} from "@/hooks/use-redux.ts";
import {setAvatar} from "@/store/user";
import {DialogProps} from "@/hooks/use-dialog.ts";

interface Props extends DialogProps {

}

const ChangeAvatarDialog: React.FC<Props> = (props) => {

  const dispatch = useAppDispatch()

  const updateAvatar = (file: RcFile) => {
    const formData = new FormData()
    formData.append('file', file)
    updateAvatarRequest(formData).then((res) => {
      dispatch(setAvatar(res.data.path))
      notification.success({
        message: '头像更新成功'
      })
      props.closeDialogCallback()
    })
  }

  return (
      <Modal open={props.visible} title={props.title} footer onCancel={props.closeDialogCallback}>
        <div className='mt-6'>
          <ImgCrop>
            <Upload
                showUploadList={false}
                customRequest={(info) => updateAvatar(info.file as RcFile)}
            >
              <Button icon={<i className="bi bi-cloud-arrow-up"></i>}>本地上传</Button>
            </Upload>
          </ImgCrop>
        </div>
      </Modal>
  )
}

export default ChangeAvatarDialog