import { useAppSelector } from "@/store/hooks"
import { MenuProps } from "antd"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import menus from "@/router/menu"
import { getCheckedKeysArr, getPermissionMenu } from '@/router/utils'
export default function useSideBar() {
  const collapsed = useAppSelector(state => state.CollapsedReducer.collapsed)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const navigate = useNavigate()
  const getSubMenu = (pathname) => {

    const pathArray = pathname.split("/").slice(1)
    const result = pathArray.reduce((newArr, item, index) => {
      const str = newArr[index] + '/' + item
      newArr.push(str)
      return newArr
    }, [''])
    setOpenKeys(result)

    setSelectedKeys([pathname])
  }
  useEffect(() => {
    getSubMenu(pathname)
  }, [pathname])


  const onOpenChange: MenuProps['onOpenChange'] = keys => {

    const rootSubmenuKeys = ['/banner', '/pro', '/account'];
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  const changeUrl = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }


  const adminname = useAppSelector(state => state.admins.adminname)
  const checkedKeys = useAppSelector(state => state.admins.checkedKeys)

  let newMenus = menus
  if (checkedKeys.length === 0 && adminname === "admin") {
    newMenus = menus
  } else {
    const newCheckedKeys = getCheckedKeysArr(checkedKeys) as string[]
    newMenus = getPermissionMenu(menus, newCheckedKeys)
  }
  return {
    onOpenChange,
    collapsed,
    selectedKeys,
    openKeys,
    changeUrl,
    newMenus

  }
}
