import request from "../utils/request";

export function getShopsNum() {
  return request({
    url: '/statistic/product'
  })
}

export function getUsersNum() {
  return request({
    url: '/statistic/user'
  })
}

export function getUserTotalNum() {
  return request({
    url: '/statistic/user'
  })

}

export function getProductTotalNum() {

  return request({
    url: '/statistic/product'

  })

}