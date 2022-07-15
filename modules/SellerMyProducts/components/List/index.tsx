import React, { FC, useState } from 'react'
import { Button, Row, Col, Typography, Avatar, Image, Rate, Pagination } from 'antd'
import t from '~/locales'
import styles from './List.module.scss'

const { Text } = Typography

interface IMockData {
  id: string
  title: string
  orderId: string
  productName: string
  status: string
  avatar: string
  detail: string
}

const data: IMockData[] = [
  {
    id: '1',
    title: 'Hannah',
    orderId: '2006306N01XXFD',
    productName: 'ดัมเบลหุ้มยาง 4 กิโลกรัม',
    status: 'wait',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  },
  {
    id: '2',
    title: 'Sophia',
    orderId: '2006306N01XXF1',
    productName: 'ดัมเบลหุ้มยาง 3 กิโลกรัม',
    status: 'reply',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  }
]

const List: FC = () => {
  return (
    <>
     
    </>
  )
}

export default List
