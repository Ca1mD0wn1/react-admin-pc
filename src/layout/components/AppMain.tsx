// src/layout/components/AppMain.tsx 内容区域
import React, { FC } from 'react';
import { Layout } from 'antd';
import menus from '@/router/menu';
import { getCheckedKeysArr, getPermissionMenu, isContainMenus, renderRoute } from '@/router/utils';
import { Routes, Route, useLocation } from 'react-router-dom'
import Page404 from '@/views/error/Index';
import { useAppSelector } from '@/store/hooks';
interface IAppMainProps {

};
const { Content } = Layout;
// const arr = renderRoute(menus)
// console.log('arr', arr[1])
const AppMain: FC<IAppMainProps> = () => {
  // admin账户所有的权限均可见  其余权限是动态的
  const adminname = useAppSelector(state => state.admins.adminname);
  const checkedKeys = useAppSelector(state => state.admins.checkedKeys);
  // console.log('checkedKeys', checkedKeys)
  let newMenus = menus
  if (checkedKeys.length === 0 && adminname === 'admin') {
    newMenus = menus
  } else {
    const newCheckedKeys: any = getCheckedKeysArr(checkedKeys)
    newMenus = getPermissionMenu(menus, newCheckedKeys)
  }

  const { pathname } = useLocation()
  const flag = isContainMenus(menus, pathname)

  return (
    <Content
      className="site-layout-background"
      id='test'
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      {/* 
        多个路由需要定义时，包裹在Routes选项下
      */}
      <Routes>
        {
          renderRoute(newMenus)
        }
        {/* 
            ++++++ 404+++++
        */}
        <Route path="*" element={flag ? <div>无权限</div> : <Page404 />} />
      </Routes>
    </Content>
  )
};

export default AppMain;