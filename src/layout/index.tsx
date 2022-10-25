
import { Layout, } from 'antd';
import React from 'react';
import AppTabs from './components/AppTabs';
import { SideBar, AppHeader, AppMain } from './components/index'

const App: React.FC = () => {

  return (
    <Layout id='admin-app'>
      <SideBar >
      </SideBar>
      <Layout className="site-layout">
        <AppHeader></AppHeader>
        <AppTabs></AppTabs>
        <AppMain></AppMain>
      </Layout>
    </Layout>
  );
};

export default App;