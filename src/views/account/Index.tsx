import React, { FC } from 'react';
import { Outlet } from 'react-router-dom'
interface IIndexProps {


};
const Index: FC<IIndexProps> = () => {


  return (
    <><div>账户管理主页</div><Outlet></Outlet></>

  )

};

export default Index;