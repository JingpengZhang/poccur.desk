import {Menu} from "antd";
import React, {ReactNode, useMemo, useState} from "react";
import AntdUtils from "@/utils/antd-utils.ts";
import {useAppSelector} from "@/hooks/useRedux.ts";
import type {Menu as IMenuItem} from '@/services/menu.ts'
import {useNavigate} from "react-router-dom";


interface MenuItem extends IMenuItem {
  key?: string;
  label?: string;
  icon?: ReactNode;
  type?: "group";
  disabled?: boolean;
}

const SideBar: React.FC = () => {

  const navigate = useNavigate()

  const menuTreeStore = useAppSelector(state => state.main.menuTree)

  const [menuList, setMenuList] = useState<IMenuItem[]>([])

  const convertMenus = (menus: MenuItem[]) => {
    let _menuList: IMenuItem[] = []
    const loop = (menuList: MenuItem[]) => {
      for (let i = 0; i < menuList.length; i++) {
        const menuItem = menuList[i];
        if (menuItem.visible) {
          menuItem.label = menuItem.name;
          menuItem.key = menuItem.id;
          menuItem.icon = <i className={menuItem.iconclass}/>;
          menuItem.disabled = !menuItem.enable
          _menuList.push(menuItem)
          if (menuItem.children) loop(menuItem.children);
        } else {
          // @ts-ignore
          menuList[i] = undefined
        }
      }
    };
    loop(menus);
    setMenuList(_menuList)
    return menus;
  };

  const renderMenu = useMemo(() => {
    const treeData = AntdUtils.treeDataAddKeyBy(menuTreeStore, 'id')
    return convertMenus(treeData)
  }, [menuTreeStore]);

  const handleClickMenuItem = (key: React.Key) => {
    const menuItemInfo = menuList.find(item => item.id === key)
    if (menuItemInfo) navigate(menuItemInfo.path)
  }

  return (
      <section className="w-56 flex-shrink-0 bg-white border-r">
        <Menu mode="inline" items={renderMenu as any} onClick={(itemInfo) => handleClickMenuItem(itemInfo.key)}/>
      </section>
  );
}

export default SideBar