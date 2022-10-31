import { Menu } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IMenuProps } from './inter';

export const renderMenu = (menus: IMenuProps[]) => {
  return menus.map(item => {
    if (item.children) {
      return item.hidden ? null : (<Menu.SubMenu title={item.label} icon={item.icon} key={item.key}>
        {
          renderMenu(item.children)
        }
      </Menu.SubMenu>)
    } else {
      return item.hidden ? null : <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
    }
  })
}

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

export function getTreeData(menus: IMenuProps[]) {
  const arr: DataNode[] = []
  menus.forEach(item => {
    let obj: DataNode = {
      key: '',
      title: ''
    }
    if (item.children) {
      obj = {
        key: item.keyid,
        title: item.label,
        children: getTreeData(item.children)
      }
    } else {
      obj = {
        key: item.keyid,
        title: item.label
      }
    }
    arr.push(obj)
  })
  return arr
}

export function getCheckedKeysArr(arr: string[]) {
  let brr = new Set()
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j += 2) {
      brr.add(arr[i].substring(0, j + 3))
    }
  }
  return [...brr]
}

export function getPermissionMenu(menus: IMenuProps[], checkedKeys: string[]) {

  let arr: IMenuProps[] = []
  checkedKeys.forEach(value => {
    menus.forEach(item => {
      if (item.keyid === value) {
        arr.push({ ...item })
      }
    });
  })
  arr.forEach(item => {

    if (item.children) {
      let newArr = getPermissionMenu(item.children, checkedKeys)
      item.children = newArr
    }
  })
  return arr
}

export function isContainMenus(menus: IMenuProps[], pathname: string) { // ++++++++++
  let bool = menus.some(item => {
    if (item.children) {
      if (item.key === pathname) {
        return true
      } else {
        return item.children.some(it => it.key === pathname)
      }
    } else {
      return item.key === pathname
    }
  })

  return bool
}