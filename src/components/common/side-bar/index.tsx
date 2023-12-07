import {Menu} from "antd";
import React, {ReactNode, useMemo, useState} from "react";


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
  const [menus, setMenus] = useState<MenuItem[]>([
    {
      id: "qwe",
      name: "管理",
      iconclass: "bi bi-card-list",
      children: [
        {
          id: "qad",
          name: "分类管理",
          iconclass: "bi bi-diamond",
        },
      ],
    },
  ]);

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

  const renderMenus = useMemo(() => {
    return convertMenus(menus);
  }, [menus]);

  return (
      <section className="w-56 flex-shrink-0 bg-white border-r">
        <Menu mode="inline" items={renderMenus as any}/>
      </section>
  );
}

export default SideBar