import { Button, Form, Input, message } from 'antd';
import React, { FC } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.less';
import store from 'store2'
import { useAppDispatch } from '@/store/hooks';
import { changeAdminName, changeCheckedkeys, changeLoginState, changeRole, changeToken } from '@/store/modules/admins';
import { useNavigate } from 'react-router-dom';
import { adminLoginFn } from '@/api/admin';
interface ILoginProps {


};
const Login: FC<ILoginProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()



  const onFinish = (values: any) => {
    adminLoginFn(values).then(res => {
      switch (res.data.code) {
        case '10003':
          message.error('密码错误')
          break;
        case '10005':
          message.error('没有该账户，请联系超管')
          break;
        default:
          message.success('登录成功')
          // 存信息到本地以及状态管理器
          const result = res.data.data
          const haigouUsers = {
            loginState: true,
            'X-Token': result.token,
            adminname: result.adminname,
            role: result.role,
            checkedkeys: result.checkedkeys
          }

          store.set('haigou-users', haigouUsers)

          dispatch(changeLoginState(true))
          dispatch(changeAdminName(result.adminname))
          dispatch(changeToken(result.token))
          dispatch(changeRole(result.role))
          dispatch(changeCheckedkeys(result.checkedkeys))

          navigate('/', { replace: true })
          break;
      }
    })

  };

  return (
    <div id='loginForm'>
      <div className='loginBox'>
        <h1>嗨购管理系统</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ // 表单自动填充的字段
            adminname: 'admin',
            password: '123456'
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="adminname"
            rules={[{ required: true, message: '请输入管理员账户!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账户" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登 录
            </Button>

          </Form.Item>
        </Form>
      </div>
    </div>

  )

};

export default Login;