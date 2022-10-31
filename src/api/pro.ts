// src/api/pro.ts
import request from "../utils/request";
interface ISearchParams {
  category: string
  search: string
}

// 首页产品列表
export function getProList() {
  return request({
    url: '/pro/list'
  })
}
// 筛选列表数据
export function getSearchProList(params: ISearchParams) {
  return request({
    url: '/pro/searchPro',
    method: 'POST',
    data: params
  })
}
// 获取商品分类
export function getCategoryList() {
  return request({
    url: '/pro/getCategory'
  })
}
// 商品推荐列表
export function getDetailRecommendList() {
  return request({
    url: '/pro/showdata',
    method: 'POST',
    data: {
      type: 'isrecommend',
      flag: 1
    }
  })
}

// 购物车推荐列表
export function getCartRecommendList() {
  return request({
    url: '/pro/showdata',
    method: 'POST',
    data: {
      type: 'isrecommend',
      flag: 1
    }
  })
}
// 修改推荐
export function updateRecommend(params: { proid: string, flag: boolean }) {
  return request({
    url: '/pro/updateFlag',
    method: 'POST',
    data: {
      ...params,
      type: 'isrecommend'
    }
  })
}

// 修改秒杀
export function updateSeckill(params: { proid: string, flag: boolean }) {
  return request({
    url: '/pro/updateFlag',
    method: 'POST',
    data: {
      ...params,
      type: 'isseckill'
    }
  })
}