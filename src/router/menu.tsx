import { IMenuProps } from "./inter"
import {
  HomeOutlined,
  UploadOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  PictureOutlined,
  FilterOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined
} from "@ant-design/icons"

import Home from '@/views/home/Index'

import BannerList from "@/views/banner/List"
import BannerIndex from '@/views/banner/Index'
import ActiveBannerList from '@/views/banner/Active'
import AddBanner from '@/views/banner/Add'

import ProductIndex from '@/views/product/Index'
import SearchProduct from '@/views/product/Search'
import CartList from '@/views/product/list/Cart'
import DetailList from '@/views/product/list/Detail'
import HomeList from '@/views/product/list/Home'
import ProductListIndex from '@/views/product/list/Index'

import AccountIndex from '@/views/account/Index'
import AdminList from '@/views/account/AdminList'
import UserList from '@/views/account/UserList'

import SettingIndex from '@/views/setting/Index'
const menus: IMenuProps[] = [
  {
    label: "系统首页",
    key: '/',
    icon: <HomeOutlined />,
    element: <Home />
  },
  {
    label: "轮播图管理",
    key: "/banner",
    icon: <UploadOutlined />,
    element: <BannerIndex />,
    children: [
      {
        label: "首页轮播图",
        key: "/banner/home",
        icon: <PictureOutlined />,
        element: <BannerList />,
        index: 1,
      }, {
        label: "活动轮播图",
        key: "/banner/active",
        icon: <PictureOutlined />,
        element: <ActiveBannerList />

      }, {
        label: "添加轮播图",
        key: "/banner/add",
        icon: <PictureOutlined />,
        element: <AddBanner />
      },
    ]
  },
  {
    label: "产品管理",
    key: "/pro",
    icon: <ProfileOutlined />,
    element: <ProductIndex />,
    children: [
      {
        label: "产品列表",
        key: "/pro/list",
        icon: <OrderedListOutlined />,
        element: <ProductListIndex />,
        index: 1,
        children: [{
          label: "首页产品列表",
          key: "/pro/list/home",
          icon: <OrderedListOutlined />,
          element: <HomeList />,
          index: 1,
        },
        {
          label: "详情推荐列表",
          key: "/pro/list/detail",
          icon: <OrderedListOutlined />,
          element: <DetailList />
        },
        {
          label: "购物车推荐列表",
          key: "/pro/list/cart",
          icon: <OrderedListOutlined />,
          element: <CartList />
        }]
      }, {
        label: "筛选列表",
        key: "/pro/search",
        icon: <FilterOutlined />,
        element: <SearchProduct />
      }]
  }, {
    label: "账户管理",
    key: "/account",
    icon: <TeamOutlined />,
    element: <AccountIndex />,
    children: [{
      label: "用户列表",
      key: "/account/userList",
      icon: <UserOutlined />,
      element: <UserList />,
      index: 1,

    }, {
      label: "管理员列表",
      key: "/account/adminList",
      icon: <UserOutlined />,
      element: <AdminList />
    }]
  },
  {
    label: "设置",
    key: "/setting",
    icon: <SettingOutlined />,
    element: <SettingIndex />
  }
]

export default menus