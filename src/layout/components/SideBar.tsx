import { FC } from 'react';
import { Layout, Menu } from 'antd';
import menus from '@/router/menu'
import useSideBar from './hooks/useSideBar'
const { Sider } = Layout;

interface ISideBarProps {
};
const SideBar: FC<ISideBarProps> = () => {
  const { onOpenChange, collapsed, selectedKeys, openKeys, changeUrl } = useSideBar()
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#fff" }}>{collapsed ? "" : "我是后台管理系统"}</div>
      <Menu
        theme='dark'
        mode="inline"
        selectedKeys={selectedKeys}
        items={menus}
        openKeys={openKeys}
        onClick={changeUrl}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )

};

export default SideBar;