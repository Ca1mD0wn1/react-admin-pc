import { Layout, Menu } from 'antd';
import { FC } from 'react';
import useSideBar from './hooks/useSideBar';
const { Sider } = Layout;

interface ISideBarProps {
};
const SideBar: FC<ISideBarProps> = () => {
  const { onOpenChange, newMenus, collapsed, selectedKeys, openKeys, changeUrl } = useSideBar()
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#fff" }}>{collapsed ? "" : "我是后台管理系统"}</div>
      <Menu
        theme='dark'
        mode="inline"
        selectedKeys={selectedKeys}
        items={newMenus}
        openKeys={openKeys}
        onClick={changeUrl}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )

};

export default SideBar;