import { Tag } from 'antd';
import React, { FC } from 'react';
import useTabs from './hooks/useTabs';

interface IAppTabProps {


};
const AppTabs: FC<IAppTabProps> = () => {
  const { arr, current, setArr, setCurrent, navigate } = useTabs()

  return (
    <div style={{
      'backgroundColor': '#fff',
      'height': 36,
      'borderTop': '1px solid #ccc',
      'borderBottom': '1px solid #ccc',
      'overflow': 'auto',
      'whiteSpace': 'nowrap' // 不换行 滚动条
    }}>
      {
        arr && arr.map((item, index) => {
          return (
            <Tag
              key={item.key}
              style={{
                height: 32,
                lineHeight: '32px',
                marginTop: 2,
                marginLeft: 5,
                color: current === index ? '#fff' : '#333'
              }}
              color={current === index ? '#108ee9' : '#efefef'}
              onClick={() => {
                navigate(item.key, { replace: false })
                setCurrent(index)
              }}
              closable={current === index && index !== 0}
              onClose={(e) => {
                e.preventDefault()
                arr.splice(index, 1)
                setArr(arr)
                setCurrent(index - 1)
                navigate(arr[current - 1].key, { replace: false })
              }}
            >
              {item.label}
            </Tag>
          )
        })
      }
    </div>
  )

};

export default AppTabs;