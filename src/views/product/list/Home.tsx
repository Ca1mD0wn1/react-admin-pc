import React, { FC, useEffect, useState } from 'react';
import { Table, Space, Button, Image, Switch } from 'antd'
import { useNavigate } from 'react-router-dom';
import {
  DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
import { getProList, updateRecommend, updateSeckill } from '@/api/pro';
interface IHomeProps {


};
interface DataType {
  banners: string[]
  brand: string
  category: string
  desc: string
  discount: number
  img1: string
  img2: string
  img3: string
  img4: string
  isrecommend: number
  issale: number
  isseckill: number
  originprice: number
  proid: string
  proname: string
  sales: number
  stock: number
}
const Home: FC<IHomeProps> = () => {
  const [height, setHeight] = useState(document.body.offsetHeight)
  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(document.body.offsetHeight)
    })
  }, [])
  const config = usePagination({
    position: ['bottomLeft'],
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 30, 40],
    showQuickJumper: true
  })
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const getProListData = () => {
    getProList().then(res => {
      setList(res.data.data)
    })
  }
  useEffect(() => {
    getProListData()
  }, [])

  return (
    <Space
      direction='vertical'
      style={{ display: 'flex' }}
    >
      <Button type="primary">添加商品</Button>
      <Table
        rowKey={"proid"}
        dataSource={list}
        scroll={{ y: height - 330 }}
        pagination={config}
      >

        <Table.Column title="序号" render={(_, record, index) => {
          return (
            <span>{(config.current - 1) * config.pageSize + index + 1}</span>
          )
        }}></Table.Column>
        <Table.Column title="图片" dataIndex="img1" render={text => {
          return <Image src={text} style={{ height: 80 }} />
        }}></Table.Column>
        <Table.Column title="商品名称" dataIndex="proname"></Table.Column>
        <Table.Column title="商品价格" dataIndex="originprice"></Table.Column>
        <Table.Column title="是否秒杀" dataIndex="isseckill" render={(text, record: DataType) => {
          return (
            <Switch defaultChecked={text === 1} onChange={
              () => {
                console.log(text)
                updateSeckill({ proid: record.proid, flag: text === 0 }).then(() => getProListData())
              }
            } />
          )
        }}></Table.Column>

        <Table.Column title="是否推荐" dataIndex="isrecommend" render={(text, record: DataType) => {
          return (
            <Switch defaultChecked={text === 1} onChange={
              () => {
                updateRecommend({ proid: record.proid, flag: text === 0 }).then(() => getProListData())
              }
            } />
          )
        }}></Table.Column>
        <Table.Column title="操作" render={(_, record: DataType) => {
          return (
            <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
          )
        }}></Table.Column>
      </Table>
    </Space >
  )

};

export default Home;