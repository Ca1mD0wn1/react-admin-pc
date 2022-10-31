// src/views/product/Search.tsx
import React, { FC, useState, useEffect } from 'react';
import { Table, Space, Button, Image, Switch, Select, Input } from 'antd'
import { useNavigate } from 'react-router-dom';
import {
  DeleteOutlined
} from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
import { getCategoryList, getProList, updateRecommend, updateSeckill, getSearchProList } from '@/api/pro';
interface IIndexProps {

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
const Index: FC<IIndexProps> = () => {
  const [height, setHeight] = useState(document.body.offsetHeight) // 计算body的高度
  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(document.body.offsetHeight)
    })
  }, [])
  // 分页设置
  const config = usePagination({
    position: ['bottomLeft'],
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 30, 40],
    showQuickJumper: true
  })

  const navigate = useNavigate()

  const [list, setList] = useState([])
  const getProListData = () => {
    getProList().then(res => {
      console.log(res.data)
      setList(res.data.data)
    })
  }
  useEffect(() => {
    getProListData()
  }, [])

  const [categoryList, setCategoryList] = useState([])
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    getCategoryList().then(res => setCategoryList(res.data.data))
  }, [])

  return (
    <Space
      direction='vertical'
      style={{ display: 'flex' }}
    >
      <Space>
        <Select value={category} style={{ width: 100 }} onChange={value => setCategory(value)}>
          <Select.Option value="">全部</Select.Option>
          {
            categoryList && categoryList.map((item, index) => {
              return (
                <Select.Option key={index} value={item}>{item}</Select.Option>
              )
            })
          }
        </Select>
        <Input placeholder='请输入搜索关键词' value={search} onChange={(e) => setSearch(e.target.value)}></Input>
        <Button type='primary' onClick={() => {
          getSearchProList({ category, search }).then(res => setList(res.data.data))
        }}>搜索</Button>
      </Space>
      <Table
        rowKey="proid"
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
        <Table.Column title="商品价格" dataIndex="originprice" sorter={(a: DataType, b: DataType) => a.originprice - b.originprice}></Table.Column>
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
    </Space>
  )
};

export default Index;