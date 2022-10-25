import { Route, Navigate } from 'react-router-dom';
import { IMenuProps } from './inter';



export const renderRoute = (menus: IMenuProps[]) => {
  return menus.map((item) => {
    if (item.children) {
      return (
        <Route path={item.key} element={item.element} key={item.key}>
          {renderRoute(item.children)}
        </Route>
      )
    } else {
      return (
        <Route path={item.key} element={item.element} key={item.key}>
        </Route>
      )
    }

  })
}

//<Route path='/' element={<Navigate to='/home' replace />} />