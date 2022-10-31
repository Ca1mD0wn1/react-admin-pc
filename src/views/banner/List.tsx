import React, { FC, useEffect, useState } from 'react';
import { deleteBanner, getBannerList } from '@/api/banner';
import { Button, Space, Table, Image, Popconfirm } from 'antd';
import { useNavigate } from 'react-router';
import { DeleteOutlined } from '@ant-design/icons'
import usePagination from '@/hooks/usePagination';
interface IListProps {


};

interface DataType {
  bannerid: string
  img: string
  alt: string
  link: string
  flag: boolean
}
const List: FC<IListProps> = () => {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const getBannerListData = () => {
    getBannerList().then(res => {

      setList(res.data.data)
    })
  }
  useEffect(() => { getBannerListData() }, [])

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
    pageSizeOptions: [1, 2, 3, 4],
    showQuickJumper: true
  })

  return (

    <Space
      direction='vertical'
      style={{ display: 'flex' }}
    >
      <Button
        onClick={() => {
          navigate('/banner/add')
        }}
        type="primary"
      >添加轮播图</Button>
      <Table
        rowKey={"bannerid"}
        dataSource={list}
        scroll={{ y: height - 330 }}
        pagination={config}
      >
        <Table.Column title='序号' render={(_, record, index) => { return (<span>{index + 1}</span>) }}></Table.Column>
        <Table.Column title='图片' dataIndex={'img'} render={text => {
          return (<Image src={text} style={{ height: 80 }}></Image>)
        }}></Table.Column>
        <Table.Column title='alt' dataIndex={'alt'}></Table.Column>
        <Table.Column title='link' dataIndex={'link'}></Table.Column>
        <Table.Column title='操作' render={(_, record: DataType) => {
          return (<Popconfirm title={'确定删除吗?'} onConfirm={() => {
            deleteBanner({ bannerid: record.bannerid }).then(() => {
              getBannerListData()
            })
          }}>
            <Button danger shape='circle' icon={<DeleteOutlined></DeleteOutlined>}></Button>
          </Popconfirm>)
        }}></Table.Column>


      </Table>
    </Space>
  )

};

export default List;