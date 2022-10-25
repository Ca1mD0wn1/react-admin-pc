import React, { FC } from 'react';

import { Layout } from 'antd';
import { Routes } from 'react-router-dom';
import { renderRoute } from '@/router/utils'
import menus from '@/router/menu';

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
      </Routes>

    </Content>
  )

};

export default AppMain;