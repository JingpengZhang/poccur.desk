import {useState} from "react";

export interface DialogProps {
  visible: boolean,
  title: string;
  closeDialogCallback: () => void
  submitCallback?: () => void
}

const useDialog = (options?: {
  title?: string,
  visible?: boolean
}) => {
  const [visible, setVisible] = useState(options?.visible || false);

  const [title, setTitle] = useState(options?.title || '标题')

  const openDialog = () => {
    setVisible(true)
  }

  const closeDialog = () => {
    setVisible(false)
  }

  return {
    visible, setVisible, title, setTitle, openDialog, closeDialog
  }
}

export default useDialog