import {Menu} from "antd";
import React, {ReactNode, useMemo} from "react";
import AntdUtils from "@/utils/antd-utils.ts";
import {useAppSelector} from "@/hooks/useRedux.ts";


interface MenuItem {
  id: string;
  key?: string;
  name: string;
  label?: string;
  iconclass: string;
  icon?: ReactNode;
  children?: MenuItem[];
  type?: "group";
  disable?: boolean;
}

const SideBar: React.FC = () => {

  const menuTreeStore = useAppSelector(state => state.main.menuTree)

  const convertMenus = (menus: MenuItem[]) => {
    const loop = (menuList: MenuItem[]) => {
      for (let i = 0; i < menuList.length; i++) {
        const menuItem = menuList[i];
        menuItem.label = menuItem.name;
        menuItem.key = menuItem.id;
        menuItem.icon = <i className={menuItem.iconclass}/>;
        if (menuItem.children) loop(menuItem.children);
      }
    };
    loop(menus);
    return menus;
  };

  const renderMenu = useMemo(() => {
    const treeData = AntdUtils.treeDataAddKeyBy(menuTreeStore, 'id')
    return convertMenus(treeData)
  }, [menuTreeStore]);

  return (
      <section className="w-56 flex-shrink-0 bg-white border-r">
        <Menu mode="inline" items={renderMenu as any}/>
      </section>
  );
}

export default SideBar