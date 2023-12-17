import {Menu} from "antd";
import React, {ReactNode, useMemo, useState} from "react";
import AntdUtils from "@/utils/antd-utils.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/use-redux.ts";
import type {Menu as IMenuItem} from '@/services/admin/menu.ts'
import {useNavigate} from "react-router-dom";
import {BreadCrumbItem} from "@/components/breadcrumb";
import {setBreadcrumbItems} from "@/store/main";


interface MenuItem extends IMenuItem {
  key?: string;
  label?: string;
  icon?: ReactNode;
  type?: "group";
  disabled?: boolean;
}

const SideBar: React.FC = () => {

  const dispatch = useAppDispatch();

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
          // @ts-ignore
          menuItem.enable = menuItem.enable.toString()
          // @ts-ignore
          menuItem.visible = menuItem.visible.toString()
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

  const handleClickMenuItem = (keyPath: string[]) => {

    let breadcrumbItems: BreadCrumbItem[] = []

    for (let i = keyPath.length - 1; i >= 0; i--) {
      const _key = keyPath[i]
      const menuItemInfo = menuList.find(item => item.id === _key)
      if (menuItemInfo) {
        breadcrumbItems.push({
          id: menuItemInfo.id,
          name: menuItemInfo.name,
          path: menuItemInfo.path,
          iconclass: menuItemInfo.iconclass
        })
        if (i === 0) navigate(menuItemInfo.path);
      }
    }

    dispatch(setBreadcrumbItems(breadcrumbItems))
  }

  return (
      <section className="w-56 flex-shrink-0 bg-white border-r">
        <Menu mode="inline" items={renderMenu as any} onClick={({keyPath}) => handleClickMenuItem(keyPath)}/>
      </section>
  );
}

export default SideBar