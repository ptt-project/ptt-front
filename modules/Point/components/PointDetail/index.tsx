import React, { FC } from 'react'
import { Button, Row, Col,Typography,Avatar,Image,Rate  } from 'antd'
import t from '~/locales'
import styles from './PointDetail.module.scss'

const { Text } = Typography
const data = [
  {
    title: 'Hannah',
    orderID: '2006306N01XXFD',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'wait',
    avatar: 'https://joeschmoe.io/api/v1/random'
  },
  {
    title: 'Sophia',
    orderID: '2006306N01XXF1',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'reply',
    avatar: 'https://joeschmoe.io/api/v1/random'
  },
  {
    title: 'Kennocha',
    orderID: '2006306N01XXF2',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'wait',
    avatar: 'https://joeschmoe.io/api/v1/random'
  },
  {
    title: 'Caroline',
    orderID: '2006306N01XXF3',
    productName:'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status:'wait',
    avatar: 'https://joeschmoe.io/api/v1/random'
  }
]

const PointDetail: FC = () => (
  <>
    <Row >
      <Button className='mr-1'>{t('shopPoint.all')}</Button>
      <Button className='mr-1'>{t('shopPoint.point.five')}</Button>
      <Button className='mr-1'>{t('shopPoint.point.four')}</Button>
      <Button className='mr-1'>{t('shopPoint.point.three')}</Button>
      <Button className='mr-1'>{t('shopPoint.point.two')}</Button>
      <Button className='mr-1'>{t('shopPoint.point.one')}</Button>  
    </Row>
    <Row className={`mt-4 ${styles.hrTitleCol}`}>
      <Col lg={6}><Text type="danger">{t('shopPoint.productDetail')}</Text></Col>
      <Col lg={12}><Text type="danger">{t('shopPoint.reviewDetail')}</Text></Col>
      <Col lg={6}><Text type="danger">{t('shopPoint.yourReply')}</Text></Col>
    </Row>
    <div className="mb-3">
    <Row className={`mt-4 ${styles.tableTitle}`}>
      <Col span={18}>{t('shopPoint.user')} : <Avatar src="https://joeschmoe.io/api/v1/random" /> Sara</Col>
      <Col className="text-left mt-1" span={6}>{t('shopPoint.orderID')}: 2006306N01XXFD</Col>
    </Row>
    <Row >
      <Col className={styles.productCol} span={6}>
        <Image  width={50} src="https://joeschmoe.io/api/v1/random"/>
        <Text>ดัมเบลหุ้มยาง 2 กิโลกรัม</Text>
      </Col>
      <Col className={styles.reviewCol} span={12}>
        <Rate allowHalf defaultValue={3} />
        <p>คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ</p>
        <Text type='secondary'>23/06/2022 23:23</Text>
      </Col>
      <Col className={styles.replyCol} span={6}><Button className="mt-1">{t('shopPoint.reply')}</Button> </Col>
    </Row>
    </div>
    <div className="mb-3">
    <Row className={`mt-4 ${styles.tableTitle}`}>
      <Col span={18}>{t('shopPoint.user')} : <Avatar src="https://joeschmoe.io/api/v1/random" /> Sara</Col>
      <Col className="text-left mt-1" span={6}>{t('shopPoint.orderID')}: 2006306N01XXFD</Col>
    </Row>
    <Row >
      <Col className={styles.productCol} span={6}>
        <Image  width={50} src="https://joeschmoe.io/api/v1/random"/>
        <Text>ดัมเบลหุ้มยาง 2 กิโลกรัม</Text>
      </Col>
      <Col className={styles.reviewCol} span={12}>
        <Rate allowHalf defaultValue={3} />
        <p>คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ</p>
        <Text type='secondary'>23/06/2022 23:23</Text>
      </Col>
      <Col className={styles.replyCol} span={6}><Button className="mt-1">{t('shopPoint.reply')}</Button> </Col>
    </Row>
    </div>
    

  </>
)

export default PointDetail
