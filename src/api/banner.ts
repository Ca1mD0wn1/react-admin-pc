import request from "../utils/request";

export interface IBannerParams {
  img: string
  alt: string
  link: string
}

export function getBannerList() {
  return request({
    url: '/banner/list'
  })
}


export function addBanner(params: IBannerParams) {
  return request({
    url: '/banner/add',
    method: 'POST',
    data: params
  })
}

export function deleteBanner(params: { bannerid: string }) {
  return request({
    url: '/banner/delete',
    data: params
  })
}