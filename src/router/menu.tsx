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

import Data from '@/views/data/Index'
import ECharts from '@/views/data/ECharts'
import HighCharts from '@/views/data/HighCharts'
import Antv from '@/views/data/Antv'

const menus: IMenuProps[] = [
  {
    label: "系统首页",
    key: '/',
    keyid: '0-0',
    icon: <HomeOutlined />,
    element: <Home />
  },
  {
    label: "轮播图管理",
    key: "/banner",
    keyid: '0-1',
    icon: <UploadOutlined />,
    element: <BannerIndex />,
    children: [
      {
        label: "首页轮播图",
        key: "/banner/home",
        keyid: '0-1-0',
        icon: <PictureOutlined />,
        element: <BannerList />,
        index: 1,
      }, {
        label: "活动轮播图",
        key: "/banner/active",
        keyid: '0-1-1',
        icon: <PictureOutlined />,
        element: <ActiveBannerList />

      }, {
        label: "添加轮播图",
        key: "/banner/add",
        keyid: '0-1-2',
        icon: <PictureOutlined />,
        element: <AddBanner />,
        hidden: 1
      },
    ]
  },
  {
    label: "产品管理",
    key: "/pro",
    keyid: '0-2',
    icon: <ProfileOutlined />,
    element: <ProductIndex />,
    children: [
      {
        label: "产品列表",
        key: "/pro/list",
        keyid: '0-2-0',
        icon: <OrderedListOutlined />,
        element: <ProductListIndex />,
        index: 1,
        children: [{
          label: "首页产品列表",
          key: "/pro/list/home",
          keyid: '0-2-0-0',
          icon: <OrderedListOutlined />,
          element: <HomeList />,
          index: 1,
        },
        {
          label: "详情推荐列表",
          key: "/pro/list/detail",
          keyid: '0-2-0-1',
          icon: <OrderedListOutlined />,
          element: <DetailList />
        },
        {
          label: "购物车推荐列表",
          key: "/pro/list/cart",
          keyid: '0-2-0-2',
          icon: <OrderedListOutlined />,
          element: <CartList />
        }]
      }, {
        label: "筛选列表",
        key: "/pro/search",
        keyid: '0-2-1',
        icon: <FilterOutlined />,
        element: <SearchProduct />
      }]
  }, {
    label: "账户管理",
    key: "/account",
    keyid: '0-3',
    icon: <TeamOutlined />,
    element: <AccountIndex />,
    children: [{
      label: "用户列表",
      key: "/account/userList",
      keyid: '0-3-1',
      icon: <UserOutlined />,
      element: <UserList />,
      index: 1,

    }, {
      label: "管理员列表",
      key: "/account/adminList",
      keyid: '0-3-2',
      icon: <UserOutlined />,
      element: <AdminList />
    }]
  },
  {
    label: "设置",
    key: "/setting",
    keyid: '0-4',
    icon: <SettingOutlined />,
    element: <SettingIndex />,
    hidden: 1
  },
  {
    label: '数据可视化',
    key: '/data',
    keyid: '0-5',
    icon: <SettingOutlined />,
    element: <Data />,
    children: [
      {
        label: 'ECharts',
        key: '/data/echarts',
        keyid: '0-5-0',
        icon: <SettingOutlined />,
        element: <ECharts />,
        index: 1
      },
      {
        label: 'HighCharts',
        key: '/data/highcharts',
        keyid: '0-5-1',
        icon: <SettingOutlined />,
        element: <HighCharts />
      },
      {
        label: 'antv',
        key: '/data/antv',
        keyid: '0-5-2',
        icon: <SettingOutlined />,
        element: <Antv />
      }
    ]
  }
]

export default menus