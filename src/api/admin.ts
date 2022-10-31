import request from '@/utils/request'
export interface IAdminParams {
  adminname: string
  password: string
}
export interface IAdminAddParams {
  adminname: string
  token: string
  role: number
  checkedkeys: any[]
}

// 登录
export function adminLoginFn(params: IAdminParams) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data: params
  })
}

export function getAdminList() {
  return request({
    url: '/admin/list'
  })
}

export function getAdminDetail(params: { adminname: string }) {
  return request({
    url: '/admin/detail',
    data: params
  })
}

export function addAdmin(params: IAdminAddParams) {
  return request({
    url: '/admin/add',
    data: params,
    method: 'POST'
  })
}

export function deleteAdmin(params: { adminid: string }) {
  return request({
    url: '/admin/delete',
    method: 'POST',
    data: params
  })
}

export function updateAdmin(params: IAdminAddParams) {
  return request({
    url: '/admin/update',
    method: 'POST',
    data: params
  })
}