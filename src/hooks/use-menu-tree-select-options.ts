import {useAppSelector} from "@/hooks/use-redux.ts";
import {useMemo} from "react";
import AntdUtils from "@/utils/antd-utils.ts";

const UseMenuTreeSelectOptions = () => {
  const menuTreeStore = useAppSelector(state => state.main.menuTree)

  return useMemo(() => {
    const treeData = AntdUtils.treeDataAddKeyBy(menuTreeStore, 'id');
    return [{
      key: 'root',
      name: '根菜单',
      children: treeData
    }]
  }, [menuTreeStore])

}

export default UseMenuTreeSelectOptions