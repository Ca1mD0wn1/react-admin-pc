import { IMenuProps } from "@/router/inter";
import menus from "@/router/menu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export interface IAppTabProps {
  label: string;
  key: string
}

const tabsArr: IAppTabProps[] = []
export const getTabData = (menus: IMenuProps[]) => {
  menus.forEach(item => {
    if (item.children) {
      getTabData(item.children)
    } else {
      tabsArr.push({
        label: item.label,
        key: item.key
      })
    }
  })
  return tabsArr
}

export default function useTabs() {

  const tabsArr = getTabData(menus)
  const { pathname } = useLocation()
  const [arr, setArr] = useState([{
    label: "系统首页",
    key: '/'
  }])
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    const index = arr.findIndex(item => item.key === pathname)

    if (index == -1) {
      const item = tabsArr.find(item => item.key === pathname)
      item && arr.push(item)

      setArr(arr)
      setCurrent(arr.length - 1)
    } else {
      setCurrent(index)
    }
  }, [pathname, arr])


  return {
    arr,
    current,
    setCurrent,
    setArr,
    navigate
  }
}