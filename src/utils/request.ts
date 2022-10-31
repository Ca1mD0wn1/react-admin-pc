// src/utils/request.ts
import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import store from 'store2'

const isDev = process.env.NODE_ENV === 'development'

const instance = axios.create({
  baseURL: isDev ? 'http://121.89.205.189:3000/admin' : 'http://121.89.205.189:3000/admin',
  timeout: 6000
})


// 请求拦截器封装
instance.interceptors.request.use((config) => {
  // 可以从本地获取用户的信息，如果用户的信息存在，提取Token,通过头信息传递给服务器
  // 以前给本地存储中存储多个数据，本项目存储的是一个对象 { loginState: true, adminname: '', 'X-Token': '', role: 1, checkedkeys: []}
  const storeUsers = store.get('haigou-users') // 存的时候就是存的对象

  // 传递token信息
  config.headers!.token = storeUsers && (storeUsers['X-Token'] || '')

  return config
}, (error) => Promise.reject(error))

// 响应拦截器封装
instance.interceptors.response.use((response: any) => {
  // 验证token
  if (response.data.code === '10119') {
    // token 无效
    message.warning('登录失效，请重新登录');

    // 防止后期系统首页以及登录来回切换
    store.remove('haigou-users')

    // 跳转到登录页面 --- 如果使用的是 HashRouter ,此处地址需要改为 '/#/login'
    window.location.href = '/login'

    // 返回
    return
  }

  // 登录成功 放行
  return response
}, (error) => Promise.reject(error))

// 自定义各种常用的restful api的请求
// axios.get('url', { params: { key: value } })
// axios.post('url', { key: value })
// axios({ url: '', method: 'GET', params: { key: value }})
// axios({ url: '', method: 'POST', data: { key: value }})
export default function request(config: AxiosRequestConfig) {
  // 接口请求 必须参数  url method  data  headers
  const { url = '', method = 'GET', data = {}, headers = {} } = config

  // 区分不同的数据请求 为了执行时传入的数据请求方式统一性 GEt GeT get GET
  switch (method.toUpperCase()) {
    case 'GET':
      return instance.get(url, { params: data })

    case 'POST':
      // 可能数据请求方式 表单提交  文件提交   默认json
      // 表单提交
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        // 转换参数  URLSearchParams  / 第三方库 qs
        const p = new URLSearchParams()
        for (const key in data) {
          p.append(key, data[key])
        }
        return instance.post(url, p, { headers })
      }

      // 文件提交
      if (headers['content-type'] === 'multipart/form-data') {
        const p = new FormData()
        for (const key in data) {
          p.append(key, data[key])
        }
        return instance.post(url, p, { headers })
      }

      // 默认 application/json
      return instance.post(url, data)

    // 修改数据 - 所有的数据的更新
    case 'PUT':
      return instance.put(url, data)

    // 删除数据
    case 'DELETE':
      return instance.delete(url, { data })

    // 修改数据 - 部分的数据的更新
    case 'PATCH':
      return instance.patch(url, data)

    default:
      return instance(config)
  }
}