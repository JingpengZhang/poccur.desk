import {Menu} from "antd";
import React, {ReactNode, useEffect, useState} from "react";
import {getMenuTreeRequest} from "@/services/menu.ts";
import AntdUtils from "@/utils/antd-utils.ts";


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

  useEffect(() => {
    getMenuTree()
  }, [])

  const [menuTree, setMenuTree] = useState<any[]>([]);

  const getMenuTree = () => {
    getMenuTreeRequest().then(res => {
      const {menuTree} = res.data
      const treeData = AntdUtils.treeDataAddKeyBy(menuTree, 'id')
      const menuData = convertMenus(treeData)

      setMenuTree(menuData)
    })
  }

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

  // const renderMenus = useMemo(() => {
  //   return convertMenus(menuTree);
  // }, [menuTree]);

  return (
      <section className="w-56 flex-shrink-0 bg-white border-r">
        <Menu mode="inline" items={menuTree as any}/>
      </section>
  );
}

export default SideBar