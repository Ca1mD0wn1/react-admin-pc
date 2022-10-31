import React, { FC, useEffect, useState } from 'react';
import { Col, Row, Button } from 'antd';
import * as echarts from 'echarts';
import { getData } from '@/api/data';

interface IEChartsProps {

};

const ECharts: FC<IEChartsProps> = () => {

  const [height, setHeight] = useState(document.body.offsetHeight) // 计算body的高度
  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(document.body.offsetHeight)
    })
  }, [])

  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    getData().then(res => {
      console.log(res.data)
      setData(res.data.data)
    })
  }, [])


  useEffect(() => { })
  return (
    <>
      <h3>ECharts</h3>
    </>
  )
};

export default ECharts;