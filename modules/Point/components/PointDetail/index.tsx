import React, { FC, useState } from 'react'
import { Button, Row, Col, Typography, Avatar, Image, Rate } from 'antd'
import PointReplyModal from '../PointReplyModal'
import t from '~/locales'
import styles from './PointDetail.module.scss'

const { Text } = Typography
const data = [
  {
    title: 'Hannah',
    orderID: '2006306N01XXFD',
    productName: 'ดัมเบลหุ้มยาง 4 กิโลกรัม',
    status: 'wait',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  },
  {
    title: 'Sophia',
    orderID: '2006306N01XXF1',
    productName: 'ดัมเบลหุ้มยาง 3 กิโลกรัม',
    status: 'reply',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  },
  {
    title: 'Kennocha',
    orderID: '2006306N01XXF2',
    productName: 'ดัมเบลหุ้มยาง 2 กิโลกรัม',
    status: 'wait',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  },
  {
    title: 'Caroline',
    orderID: '2006306N01XXF3',
    productName: 'ดัมเบลหุ้มยาง 1 กิโลกรัม',
    status: 'wait',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  }
]

const PointDetail: FC = () => {
  const [isOpenReplyModal, setIsOpenReplyModal] = useState<boolean>(false)

  function toggleReplyModal(): void {
    setIsOpenReplyModal(!isOpenReplyModal)
  }

  function onReplyModal(): void {
    setIsOpenReplyModal(true)
  }
  return (
    <>
      <Row>
        <Button className="mr-1">{t('shopPoint.all')}</Button>
        <Button className="mr-1">{t('shopPoint.point.five')}</Button>
        <Button className="mr-1">{t('shopPoint.point.four')}</Button>
        <Button className="mr-1">{t('shopPoint.point.three')}</Button>
        <Button className="mr-1">{t('shopPoint.point.two')}</Button>
        <Button className="mr-1">{t('shopPoint.point.one')}</Button>
      </Row>
      <Row className={`mt-4 ${styles.hrTitleCol}`}>
        <Col lg={6}>
          <Text type="danger">{t('shopPoint.productDetail')}</Text>
        </Col>
        <Col lg={12}>
          <Text type="danger">{t('shopPoint.reviewDetail')}</Text>
        </Col>
        <Col lg={6}>
          <Text type="danger">{t('shopPoint.yourReply')}</Text>
        </Col>
      </Row>
      {data?.map((item, index) => {
        return (
          <>
            <PointReplyModal
              isOpen={isOpenReplyModal}
              toggle={toggleReplyModal}
              name={item.title}
              urlImg="https://joeschmoe.io/api/v1/random"
              rate="3"
              detail={item.detail}
            />
            <div className="mb-3">
              <Row className={`mt-4 ${styles.tableTitle}`}>
                <Col span={18}>
                  {t('shopPoint.user')} : <Avatar src="https://joeschmoe.io/api/v1/random" />
                  {item.title}
                </Col>
                <Col className="text-left mt-1" span={6}>
                  {t('shopPoint.orderID')}: <Text type="secondary">{item.orderID}</Text>
                </Col>
              </Row>
              <Row>
                <Col className={styles.productCol} span={6}>
                  <Image width={50} src="https://joeschmoe.io/api/v1/random" />
                  <Text>{item.productName}</Text>
                </Col>
                <Col className={styles.reviewCol} span={12}>
                  <Rate allowHalf defaultValue={3} />
                  <p>{item.detail}</p>
                  <Text type="secondary">23/06/2022 23:23</Text>
                </Col>
                <Col className={styles.replyCol} span={6}>
                  {item.status === 'reply' ? (
                    <Button className="mt-1"  onClick={onReplyModal}>{t('shopPoint.reply')}</Button>
                  ) : (
                    <Text>{item.productName}</Text>
                  )}
                </Col>
              </Row>
            </div>
          </>
        )
      })}
    </>
  )
}

export default PointDetail
