import {useMemo, useState} from "react";
import {message} from "antd";

type CUDialogMode = 'create' | 'update'

export interface CUDialogProps<T> {
  visible: boolean,
  title: string;
  mode: CUDialogMode;
  data: T,
  updateId: string,
  closeDialogFn: () => void
  submitCallback?: () => void
}

const UseCuDialog = <T>(options: {
  name: string,
  mode?: CUDialogMode,
  visible?: boolean,
  data?: T,
}) => {

  const [mode, setModel] = useState<CUDialogMode>(options.mode || 'create')

  const [visible, setVisible] = useState(options.visible || false)

  const [data, setData] = useState(options.data || {} as any)

  const [updateId, setUpdateId] = useState('')

  const initialData = options.data || {}

  const openDialog = (mode: CUDialogMode = 'create', options?: {
    data?: T,
    updateId?: string
  }) => {
    setModel(mode)
    if (mode === 'create') {
      setData(options?.data || initialData)
    } else {
      if (options && options.data && options.updateId) {
        setData(data)
        setUpdateId(options.updateId)
      } else {
        return message.warning('DEV:请传入需要修改的数据,及修改对象的ID')
      }
    }
    return setVisible(true)
  }

  const closeDialog = () => {
    setVisible(false)
  }


  const title = useMemo(() => {
    return mode === 'create' ? '新建' : '修改' + options.name
  }, [mode])

  return {
    mode,
    setModel,
    title,
    visible,
    data,
    setData,
    updateId,
    setUpdateId,
    setVisible,
    openDialog,
    closeDialog,
    initialData
  }
}

export default UseCuDialog;