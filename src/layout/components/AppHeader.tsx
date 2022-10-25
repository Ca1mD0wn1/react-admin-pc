import React, { FC } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import { useAppDispatch, useAppSelector, } from '@/store/hooks';
import { setCollapsed } from '@/store/modules/collapsed';
import AppBreadcrumb from './AppBreadcrumb';
import AppTabs from './AppTabs';
const { Header } = Layout;
interface IAppHeaderProps {

};
const AppHeader: FC<IAppHeaderProps> = () => {
  const collapsed = useAppSelector(state => state.CollapsedReducer.collapsed)
  const dispatch = useAppDispatch()
  return (
    <Header className="site-layout-background" style={{ padding: 0, display: 'flex' }}>
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

    </Header>
  )

};

export default AppHeader;


