import { addBanner } from '@/api/banner';
import { Input, Space, Image, Button } from 'antd';
import React, { FC, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

interface IAddProps {


};
const Add: FC<IAddProps> = () => {
  const [link, setLink] = useState('')
  const [alt, setAlt] = useState('')
  const [img, setImg] = useState('')
  const file = useRef<any>()

  const onchange = () => {
    const fileInfo = file.current.input.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(fileInfo)
    reader.onload = function () {
      setImg(this.result as string)
    }

  }
  const navigate = useNavigate()
  const flag = useMemo(() => {
    return link === '' || alt === '' || img === ''
  }, [link, alt, link])
  const add = () => {
    addBanner({
      link, alt, img
    }).then(() => {
      navigate(-1)
    })
  }
  return (
    <Space direction='vertical' style={{ width: 300 }}>
      <Input placeholder='link' value={link} onChange={e => { setLink(e.target.value) }}></Input>
      <Input placeholder='alt' value={alt} onChange={e => { setAlt(e.target.value) }}></Input>
      <Input type='file' ref={file} onChange={onchange}></Input>
      <Input placeholder='图片地址' value={img} onChange={e => { setImg(e.target.value) }}></Input>
      <Image src={img}></Image>
      <Button onClick={add}>添加</Button>
    </Space>

  )

};

export default Add;