import React, { FC } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space } from 'antd';
import { useAppDispatch, useAppSelector, } from '@/store/hooks';
import { setCollapsed } from '@/store/modules/collapsed';
import AppBreadcrumb from './AppBreadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import store from 'store2';
import { changeLoginState } from '@/store/modules/admins';
const { Header } = Layout;
interface IAppHeaderProps {

};
const AppHeader: FC<IAppHeaderProps> = () => {


  const collapsed = useAppSelector(state => state.CollapsedReducer.collapsed)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const menu = (
    <Menu
      onClick={({ key }) => {
        console.log(key)
        if (key === '/setting') {
          navigate(key)
        } else if (key === 'logout') {
          store.remove('haigou-users')
          dispatch(changeLoginState(false))
          navigate('/login?r=' + pathname)
        } else {
          // 其余选项
        }
      }}
      items={[
        {
          label: '设置',
          key: '/setting',
        },
        {
          type: 'divider',
        },
        {
          label: '退出',
          key: 'logout',
        },
      ]}
    />
  );
  const adminname = useAppSelector(state => state.admins.adminname)

  return (<Header className="site-layout-background" style={{ padding: 0, display: 'flex' }}>
    {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
    className: 'trigger',
    onClick: () => {
      dispatch(setCollapsed(!collapsed))
    }
  })} */}
    <div >
      {
        collapsed ? <MenuUnfoldOutlined className="trigger" onClick={() => {
          dispatch(setCollapsed(!collapsed))
        }} /> : <MenuFoldOutlined className="trigger" onClick={() => {
          dispatch(setCollapsed(!collapsed))
        }} />
      }
    </div>
    <AppBreadcrumb />
    <div style={{ position: 'absolute', right: '16px' }}>
      <Dropdown overlay={menu} trigger={['click']}>
        <span>
          <Space>
            {adminname}
            <DownOutlined />
          </Space>
        </span>
      </Dropdown>
    </div>
  </Header>
  )

};

export default AppHeader;


