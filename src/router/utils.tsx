import { Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IMenuProps } from './inter';



export const renderRoute = (menus: IMenuProps[]) => {
  return menus.map((item) => {
    if (item.children) {

      if (!!item.index) {
        return (
          <Fragment key={item.key}>
            <Route index element={<Navigate to={item.key} replace />}></Route>
            <Route path={item.key} element={item.element}>
              {renderRoute(item.children)}
            </Route>
          </Fragment>
        )
      } else {
        return (<Route path={item.key} element={item.element} key={item.key}>
          {renderRoute(item.children)}
        </Route>)
      }

    } else {

      if (!!item.index) {
        return (
          <Fragment key={item.key}>
            <Route index element={<Navigate to={item.key} replace />}></Route>
            <Route path={item.key} element={item.element}>

            </Route>
          </Fragment>
        )
      } else {
        return (
          <Route path={item.key} element={item.element} key={item.key}>
          </Route>
        )
      }

    }

  })
}



//            <Route path='/' element={<Navigate to='/home' replace />} />