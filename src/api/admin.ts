

import request from '@/utils/request'
export interface IAdminParams {
  adminname: string
  password: string
}

// 登录
export function adminLoginFn(params: IAdminParams) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data: params
  })
}