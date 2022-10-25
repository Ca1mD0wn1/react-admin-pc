import { FC, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useAppSelector } from '@/store/hooks';
import menus from '@/router/menu'
const { Sider } = Layout;
interface ISideBarProps {
};
const SideBar: FC<ISideBarProps> = () => {
  const collapsed = useAppSelector(state => state.CollapsedReducer.collapsed)
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const rootSubmenuKeys = ['/banner', '/pro', '/account'];
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#fff" }}>{collapsed ? "" : "我是后台管理系统"}</div>
      <Menu
        theme='dark'
        mode="inline"
        defaultSelectedKeys={['/']}
        // defaultOpenKeys={['/banner']}
        items={menus}
        openKeys={openKeys}
        onSelect={(key) => { console.log(key) }}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )

};

export default SideBar;