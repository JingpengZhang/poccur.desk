import React from "react";

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
}

export default AntdUtils;