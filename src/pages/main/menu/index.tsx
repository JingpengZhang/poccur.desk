import React, {useEffect, useState} from "react";
import {Button, message, Modal, notification, Space, Tag, Tree,} from "antd";
import {deleteMenuRequest, getMenuTreeRequest, Menu, MenuIndexObj, updateMenuIndexesRequest} from "@/services/menu.ts";
import CUDialog from "./components/cu-dialog";
import useCuDialog from "@/hooks/use-cu-dialog.ts";
import AntdUtils from "@/utils/antd-utils.ts";
import type {TreeProps, DataNode} from 'antd/es/tree'
import EditForm from "@/pages/main/menu/components/edit-form";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import * as NProgress from 'nprogress'

const Page: React.FC = () => {

  useEffect(() => {
    getMenuTree()
  }, [])

  const [menuTree, setMenuTree] = useState<Menu[]>([]);

  const getMenuTree = () => {
    getMenuTreeRequest().then((res) => {
      const {menuTree} = res.data
      setMenuTree(menuTree)
    })
  }

  useEffect(() => {
    setDragTree(AntdUtils.treeDataAddIconBy(AntdUtils.treeDataAddKeyBy(menuTree, 'id'), 'iconclass'))
  }, [menuTree])

  const [dragTree, setDragTree] = useState([])


  const CUDialogState = useCuDialog({
    name: '菜单项',
  });

  const onDrop: TreeProps['onDrop'] = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
        data: DataNode[],
        key: React.Key,
        callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...dragTree];

    // Find dragObject
    let dragObj: DataNode;
    loop(data as any, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data as any, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else if (
        ((info.node as any).children || []).length > 0 && // Has children
        (info.node as any).expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
    ) {
      loop(data as any, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data as any, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setDragTree(data);
  };


  const resetSort = () => {
    setDragTree(AntdUtils.treeDataAddIconBy(AntdUtils.treeDataAddKeyBy(menuTree, 'id'), 'iconclass'))
  }

  const editMenuItem = (data: Menu | null) => {
    if (data) {
      CUDialogState.setUpdateId(data.id)
      CUDialogState.setData(data)
    } else {
      CUDialogState.setUpdateId('')
    }
  }

  const onCopy = () => {
    notification.success({
      message: '菜单项ID已复制到剪切板.'
    })
  }

  const savaMenuIndex = () => {

    let result: MenuIndexObj[] = [];
    const loop = (arr: Array<any>, parent: string | null) => {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        result.push({
          id: item.id,
          index: i,
          parent
        })
        if (item.children) loop(item.children, item.id)
      }
    }

    loop(dragTree, null);

    NProgress.start()
    updateMenuIndexesRequest({
      indexes: result
    }).then(() => {
      message.success('更新成功')
    }).finally(() => {
      NProgress.done()
    })
  }

  const deleteOne = (id: string) => {
    Modal.confirm({
      content: '是否确认删除此菜单项,请谨慎操作',
      type: 'warn',
      onOk() {
        deleteMenuRequest({
          ids: [id]
        }).then(() => {
          message.success('删除成功')
          getMenuTree();
        })
      }
    })
  }

  return (
      <div className='w-full'>
        <div className='flex justify-between '>
          <div className='border rounded-md p-3 w-64 bg-gray-50 flex-shrink-0 mr-4'>
            <Space className='mb-3'>
              <Button onClick={resetSort} type='default' size='small'>重置</Button>
              <Button onClick={savaMenuIndex} type='primary' size='small'>保存</Button>
            </Space>
            <Tree
                className='bg-gray-50'
                draggable
                blockNode
                treeData={dragTree as any}
                showIcon
                showLine
                fieldNames={{
                  title: 'name',
                }}
                onDrop={onDrop}
                onSelect={(data, e) => {
                  if (data) {
                    editMenuItem(e.selectedNodes[0] as unknown as Menu)
                  } else {
                    editMenuItem(null)
                  }
                }}
            />
          </div>


          <div className='flex-grow'>
            <div className='flex items-center'>
              <Button onClick={() => CUDialogState.openDialog()} type='primary'
                      icon={<i className="bi bi-plus-square"></i>}>添加菜单项</Button>
            </div>
            {
                CUDialogState.updateId &&
                <div className='w-full rounded-md border flex items-center justify-between mt-4 p-3 text-sm'>
                  <div className='flex items-center'>
                    <span>当前菜单项ID: </span>
                    <Tag className='ml-3' color='blue'>{CUDialogState.updateId}</Tag>
                    <div className='ml-3 cursor-pointer'>
                      <CopyToClipboard onCopy={onCopy} text={CUDialogState.updateId}>
                        <i className="bi bi-copy hover:text-blue-600 transition-all"/>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <i onClick={() => deleteOne(CUDialogState.updateId)} title='删除'
                     className="bi bi-trash3 cursor-pointer hover:text-red-600 transition-all"></i>
                </div>
            }
            <EditForm {...CUDialogState} closeDialogFn={CUDialogState.closeDialog} submitCallback={getMenuTree}/>
          </div>


        </div>
        <CUDialog {...CUDialogState} closeDialogFn={CUDialogState.closeDialog} submitCallback={getMenuTree}/>

      </div>
  )
}

export default Page