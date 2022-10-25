// src/layout/components/AppBreadcrumb.tsx

import { IMenuProps } from '@/router/inter';
import menus from '@/router/menu';
import { FC } from 'react';
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom';

interface IAppBreadcrumbProps {

};

const breadcrumbNameMap: Record<string, string> = {}

const getBreadcrumbData = (menus: IMenuProps[]) => {
  menus.forEach(item => {
    if (item.children) {
      breadcrumbNameMap[item.key] = item.label
      getBreadcrumbData(item.children)
    } else {
      breadcrumbNameMap[item.key] = item.label
    }
  })
}
getBreadcrumbData(menus)

const AppBreadcrumb: FC<IAppBreadcrumbProps> = () => {
  const location = useLocation()
  // /pro/list/cart
  const pathSnippets = location.pathname.split('/').filter(i => i); // ['pro', 'list', 'cart']


  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    // url /
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    location.pathname === '/' ? null : <Breadcrumb.Item key="home">
      <Link to="/">系统首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  )
};

export default AppBreadcrumb;