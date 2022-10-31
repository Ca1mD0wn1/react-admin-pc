import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Col, Row, Statistic } from 'antd';
import type { countdownValueType } from 'antd/es/statistic/utils';
import { getUserTotalNum, getProductTotalNum } from '@/api/home';
import Countdown from 'antd/lib/statistic/Countdown';
interface IIndexProps {


};
const Index: FC<IIndexProps> = () => {
  const [userNumber, setUserNumber] = useState(10)
  const [proNumber, setProNumber] = useState(10)


  useEffect(() => {
    getUserTotalNum().then(res => setUserNumber(res.data.data))
    getProductTotalNum().then(res => setProNumber(res.data.data))
  }, [])
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="商品总数量" value={proNumber} />
      </Col>

      <Col span={12}>
        <Statistic title="用户总数量" value={userNumber} />
      </Col>
    </Row>
  )

};

export default Index;