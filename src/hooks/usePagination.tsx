// src/hooks/usePagination.tsx
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState } from 'react'
export default function usePagination(config: any) {
  let { position, showSizeChanger, pageSizeOptions, showQuickJumper } = config
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const onChange = (page: SetStateAction<number>, pageSize: SetStateAction<number>) => {
    setCurrent(page)
    setPageSize(pageSize)
  }
  const showTotal = (total: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) => {
    return (<span>共有{total}条数据</span>)
  }
  return {
    position,
    current,
    pageSize,
    showSizeChanger,
    pageSizeOptions,
    showQuickJumper,
    showTotal,
    onChange
  }
}