import React from "react";
import {Modal, notification} from "antd";
import axios from "@/axios/axios.ts";

class AntdUtils {
  constructor() {
  }

  /**
   * 给对象数组添加 key,让 Tree 类组件能够使用(不会改变原数组)
   * @param treeData
   * @param by
   */
  static treeDataAddKeyBy(treeData: Array<any>, by: string) {
    const treeDataClone = JSON.parse(JSON.stringify(treeData))
    const loop = (subTree: Array<any>) => {
      for (let i = 0; i < subTree.length; i++) {
        let item = subTree[i];
        item['key'] = item[by]
        if (item.children) loop(item.children);
      }
    }
    loop(treeDataClone)

    return treeDataClone
  }

  static treeDataAddIconBy(treeData: Array<any>, by: string) {
    const treeDataClone = JSON.parse(JSON.stringify(treeData))
    const loop = (subTree: Array<any>) => {
      for (let i = 0; i < subTree.length; i++) {
        let item = subTree[i];
        item['icon'] = React.createElement('i', {className: item[by]})
        if (item.children) loop(item.children);
      }
    }
    loop(treeDataClone)

    return treeDataClone
  }


  /**
   * 通过 id 数组删除项目时,弹出确认弹窗
   * @param api 删除请求的 API 地址
   * @param ids 待删除项目 id 数组
   * @param onSuccess 删除成功回调
   * @param onFailed 删除失败回调
   */
  static deleteItemsByIdsConfirm(api: string, ids: string[], onSuccess?: () => void, onFailed?: () => void) {
    Modal.confirm({
      content: '确认删除' + (ids.length === 1 ? '该' : '所选') + '项?请谨慎操作.',
      onOk() {
        return new Promise((resolve, reject) => {
          axios.post(api, {
            ids,
          }).then(() => {
            notification.success({
              message: '删除成功'
            })
            onSuccess && onSuccess();
            resolve(null)
          }).catch(() => {
            onFailed && onFailed();
            reject()
          })
        })
      }
    })
  }
}

export default AntdUtils;