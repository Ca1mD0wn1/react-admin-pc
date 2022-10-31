import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface IDataProps {

};

const Data: FC<IDataProps> = () => {
  return (
    <>
      <h1>数据可视化</h1>
      <Outlet />
    </>
  )
};

export default Data;