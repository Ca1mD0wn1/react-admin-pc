import React, { FC, useEffect, useMemo, useState } from 'react';
import { Table, Space, Button, Tag, Popconfirm, message, Drawer, Input, Select, Modal } from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { deleteAdmin, getAdminList, addAdmin, updateAdmin } from '@/api/admin';
import usePagination from '@/hooks/usePagination';
import { TableRowSelection } from 'antd/lib/table/interface';
import Tree, { DataNode } from 'antd/lib/tree';
import { getTreeData } from '@/router/utils';
import menus from '@/router/menu';
import { useAppSelector } from '@/store/hooks';

interface IAdminListProps {
};

interface DataType {
  adminid: string
  adminname: string
  role: number
  checkedKeys: any[]
}
const AdminList: FC<IAdminListProps> = () => {


  const [height] = useState(document.body.offsetHeight)


  const [adminList, setAdminList] = useState<DataType[]>([])
  const getAdminListData = () => { // 获取列表数据
    getAdminList().then(res => {
      console.log(res.data)
      setAdminList(res.data.data)
    })
  }
  useEffect(() => {
    getAdminListData()
  }, [])

  const config = usePagination({
    position: ['bottomLeft'],
    showSizeChanger: true,
    pageSizeOptions: [1, 2, 3, 4],
    showQuickJumper: true
  })




  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      render(_, record, index) {
        return (<span>{(config.current - 1) * config.pageSize + index + 1}</span>)
      }
    },
    {
      title: '账户',
      dataIndex: 'adminname'
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (text) => { // 第一个参数即为 role 
        return text === 2 ? <Tag color="cyan">超级管理员</Tag> : <Tag>管理员</Tag>
      }
    },
    {
      title: '操作',
      render(_, record, index) {
        return (
          <Space>
            <Button type='ghost' shape="circle" icon={<EditOutlined />}
              onClick={() => {
                // 给表单填充数据
                setAdminname(record.adminname)
                setRole(record.role)
                setCheckedKeys(record.checkedKeys)
                // 弹出框显示
                setIsModalOpen(true)
              }}></Button>
            <Popconfirm title="确定删除吗?" onConfirm={() => {
              deleteAdmin({ adminid: record.adminid }).then(() => {
                // 删除完毕重新获取数据
                getAdminListData()
              })
            }} onOpenChange={() => console.log('open change')}>
              <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const flag = useMemo(() => {
    return selectedRowKeys.length > 0
  }, [selectedRowKeys])
  //抽屉
  const treeData: DataNode[] = getTreeData(menus)
  const [open, setOpen] = useState(false);
  const [adminname, setAdminname] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(1)
  // 树形控件
  const [checkedKeys, setCheckedKeys] = useState(['0-0'])

  const onAdd = () => {
    const result: any = {
      adminname, password, role, checkedKeys
    }
    addAdmin(result).then((res) => {
      console.log(res.data)
      if (res.data.code === '10004') {
        message.warning('该管理员账户已存在')
      } else if (res.data.code === '10008') {
        message.warning('账户名不符合规则')
      } else {
        message.success('添加成功')
        getAdminListData()
        setAdminname('')
        setPassword('')
        setRole(1)
        setCheckedKeys(['0-0'])
        setOpen(false)
      }

    })
  }


  const [isModalOpen, setIsModalOpen] = useState(false)
  const onUpdate = () => {
    const result: any = {
      adminname, role, checkedKeys
    }
    updateAdmin(result).then(() => {
      setIsModalOpen(false)
      setAdminname('')
      setRole(1)
      setCheckedKeys(['0-0'])
      getAdminListData()
    })
  }

  const deleteRole = useAppSelector(state => state.admins.role)
  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Space>
        <Button type='primary' onClick={() => setOpen(true)}>添加管理员</Button>
        {flag && <Button type='primary' onClick={() => {
          if (deleteRole < 2) {
            message.warn('暂无权限')
            return
          }
          const arr: any = []
          selectedRowKeys.forEach((item: any) => {
            arr.push(deleteAdmin({ adminid: item }))
          })
          Promise.all(arr).then(() => {
            getAdminListData()
          })
        }}>批量删除</Button>}
      </Space>
      <Table
        columns={columns}
        dataSource={adminList}
        // rowKey = "adminid"
        rowKey={(record) => record.adminid}
        scroll={{ y: height - 330 }}
        pagination={config}
        rowSelection={rowSelection}
      ></Table>

      <Drawer title="添加管理员" placement="right" onClose={() => {
        setOpen(false)
      }} open={open}>
        <Space direction='vertical' style={{ display: 'flex' }}>
          <Input placeholder='账户名' value={adminname} onChange={e => setAdminname(e.target.value)} />
          <Input placeholder='密码' value={password} onChange={e => setPassword(e.target.value)} />
          <Select defaultValue={1} style={{ width: '100%' }} value={role} onChange={(value) => setRole(value)}>
            <Select.Option value={1}>管理员</Select.Option>
            <Select.Option value={2}>超级管理员</Select.Option>
          </Select>
          选择该管理员的权限：
          <Tree
            checkable
            checkedKeys={checkedKeys}
            onCheck={(checkedKeys: any) => {
              setCheckedKeys(checkedKeys)
            }}
            treeData={treeData}
          />

          <Button type="primary" onClick={onAdd}>添加管理员</Button>
        </Space>
      </Drawer>

      <Modal title="修改管理员" footer={null} open={isModalOpen} onOk={() => { }} onCancel={() => {
        setAdminname('')
        setRole(1)
        setCheckedKeys(['0-0'])
        setIsModalOpen(false)
      }}>
        <Space direction='vertical' style={{ display: 'flex' }}>
          <Input disabled placeholder='账户名' value={adminname} onChange={e => setAdminname(e.target.value)} />
          <Select defaultValue={1} style={{ width: '100%' }} value={role} onChange={(value) => setRole(value)}>
            <Select.Option value={1}>管理员</Select.Option>
            <Select.Option value={2}>超级管理员</Select.Option>
          </Select>
          选择该管理员的权限：
          <Tree
            checkable
            checkedKeys={checkedKeys}
            onCheck={(checkedKeys: any) => {
              setCheckedKeys(checkedKeys)
            }}
            treeData={treeData}
          />
          <Button type="primary" onClick={onUpdate} >修改管理员权限</Button>
        </Space>
      </Modal>

    </Space>
  )
};

export default AdminList;