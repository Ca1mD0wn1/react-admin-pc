import { FC } from 'react';
import Page404 from '@/views/error/Index'
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { renderRoute } from '@/router/utils'
import menus from '@/router/menu';
import AppTabs from './AppTabs';

const { Content } = Layout;

interface IAppMainProps {


};
const AppMain: FC<IAppMainProps> = () => {


  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >

      <Routes>
        {renderRoute(menus)}
        <Route path={"*"} element={<Page404 />}></Route>
      </Routes>
    </Content>
  )

};

export default AppMain;