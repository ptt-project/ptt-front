import React, { FC, useState } from 'react'
import { Button, Row, Col, Typography, Avatar, Image, Rate, Pagination } from 'antd'
import PointReplyModal from '../PointReplyModal'
import t from '~/locales'
import styles from './PointDetail.module.scss'

const { Text } = Typography

interface IMockData {
  title: string
  orderId: string
  productName: string
  status: string
  avatar: string
  detail: string
}

const data: IMockData[] = [
  {
    title: 'Hannah',
    orderId: '2006306N01XXFD',
    productName: 'ดัมเบลหุ้มยาง 4 กิโลกรัม',
    status: 'wait',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  },
  {
    title: 'Sophia',
    orderId: '2006306N01XXF1',
    productName: 'ดัมเบลหุ้มยาง 3 กิโลกรัม',
    status: 'reply',
    avatar: 'https://joeschmoe.io/api/v1/random',
    detail:
      'คุณภาพของสินค้าดีมาก ความคุ้มค่าคุ้มราคาดีมาก ความรวดเร็วในการจัดส่งดีมาก แนะนำยี่ห้อนี้ค่ะ'
  }
]

const PointDetail: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [replyData, setReplyData] = useState<IMockData>({
    title: '',
    orderId: '',
    productName: '',
    status: '',
    avatar: '',
    detail: ''
  })
  const ofLabel: string = t('common.pagination.of') // prevent error hook rules
  const itemsLabel: string = t('common.pagination.items') // prevent error hook rules

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onReply(reply: IMockData): void {
    setReplyData(reply)
    setIsOpen(true)
  }
  return (
    <>
      <PointReplyModal
        isOpen={isOpen}
        toggle={toggle}
        name={replyData.title}
        urlImg="https://joeschmoe.io/api/v1/random"
        rate={3}
        detail={replyData.detail}
      />
      <Row className="mb-5">
        <Button className="mr-1">{t('shopPoint.all')}</Button>
        <Button className="mr-1">{t('shopPoint.point.five')}</Button>
        <Button className="mr-1">{t('shopPoint.point.four')}</Button>
        <Button className="mr-1">{t('shopPoint.point.three')}</Button>
        <Button className="mr-1">{t('shopPoint.point.two')}</Button>
        <Button className="mr-1">{t('shopPoint.point.one')}</Button>
      </Row>
      <Row className={`${styles.hrTitleCol} mb-3`}>
        <Col lg={6} xs={7}>
          <Text type="danger">{t('shopPoint.productDetail')}</Text>
        </Col>
        <Col md={12} xs={10}>
          <Text type="danger">{t('shopPoint.reviewDetail')}</Text>
        </Col>
        <Col lg={6}>
          <Text type="danger">{t('shopPoint.yourReply')}</Text>
        </Col>
      </Row>
      <div className={styles.reviewContent}>
        {data?.map((item: IMockData) => (
          <div className="mb-3">
            <Row className={styles.reviewTitle} align="middle">
              <Col span={18}>
                <Text>{t('shopPoint.user')}:</Text>
                <Avatar
                  className={styles.avatar}
                  size={24}
                  src="https://joeschmoe.io/api/v1/random"
                />
                <Text>{item.title}</Text>
              </Col>
              <Col span={6}>
                <Text className="ml-2" type="secondary">
                  {t('shopPoint.orderId')}: {item.orderId}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col className={styles.avatarCol} span={6}>
                <div className={styles.avatarWrapper}>
                  <Image preview={false} width={48} src="https://joeschmoe.io/api/v1/random" />
                  <Text className={styles.avatarName}>{item.productName}</Text>
                </div>
              </Col>
              <Col className={styles.commentCol} span={12}>
                <Rate allowHalf defaultValue={3} />
                <Text className={styles.comment}>{item.detail}</Text>
                <Text type="secondary">23/06/2022 23:23</Text>
              </Col>
              <Col className={styles.replyCol} span={6}>
                {item.status === 'reply' ? (
                  <Button className="mt-1" onClick={(): void => onReply(item)}>
                    {t('shopPoint.reply')}
                  </Button>
                ) : (
                  <Text className={styles.reply}>{item.productName}</Text>
                )}
              </Col>
            </Row>
          </div>
        ))}
        <Row>
          <Col span={24} className="text-right">
            <Pagination
              className="mb-3"
              showTotal={(total: number, range: [number, number]): string =>
                `${range[0]}-${range[1]} ${ofLabel} ${total} ${itemsLabel}`
              }
              total={5}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default PointDetail
