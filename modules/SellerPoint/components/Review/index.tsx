import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Row, Col, Typography, Avatar, Image, Rate, Pagination } from 'antd'
import ReplyModal from '../ReplyModal'
import { LocaleNamespaceConst } from '~/constants'
import styles from './Review.module.scss'

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

const Review: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.point'])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [replyData, setReplyData] = useState<IMockData>({
    id: '',
    title: '',
    orderId: '',
    productName: '',
    status: '',
    avatar: '',
    detail: ''
  })

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onReply(reply: IMockData): void {
    setReplyData(reply)
    setIsOpen(true)
  }
  return (
    <>
      <ReplyModal
        isOpen={isOpen}
        toggle={toggle}
        name={replyData.title}
        urlImg="https://joeschmoe.io/api/v1/random"
        rate={3}
        detail={replyData.detail}
      />
      <Row className="mb-4">
        <Button className="mr-1 mb-1">{t('seller.point:all')}</Button>
        <Button className="mr-1 mb-1">{t('seller.point:point.five')}</Button>
        <Button className="mr-1 mb-1">{t('seller.point:point.four')}</Button>
        <Button className="mr-1 mb-1">{t('seller.point:point.three')}</Button>
        <Button className="mr-1 mb-1">{t('seller.point:point.two')}</Button>
        <Button className="mr-1 mb-1">{t('seller.point:point.one')}</Button>
      </Row>
      <Row className={`${styles.hrTitleCol} mb-3`}>
        <Col lg={6} xs={7}>
          <Text type="danger">{t('seller.point:productDetail')}</Text>
        </Col>
        <Col md={12} xs={10}>
          <Text type="danger">{t('seller.point:reviewDetail')}</Text>
        </Col>
        <Col lg={6}>
          <Text type="danger">{t('seller.point:yourReply')}</Text>
        </Col>
      </Row>
      <div className={styles.reviewContent}>
        {data?.map((item: IMockData) => (
          <div key={item.id} className="mb-3">
            <Row className={styles.reviewTitle} align="middle">
              <Col span={18}>
                <Text>{t('seller.point:user')}:</Text>
                <Avatar
                  className={styles.avatar}
                  size={24}
                  src="https://joeschmoe.io/api/v1/random"
                />
                <Text>{item.title}</Text>
              </Col>
              <Col span={6}>
                <Text className="ml-2" type="secondary">
                  {t('seller.point:orderId')}: {item.orderId}
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
                    {t('seller.point:reply')}
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
                `${range[0]}-${range[1]} ${t('common:pagination.of')} ${total} ${t(
                  'common:pagination.items'
                )}`
              }
              total={5}
              showSizeChanger
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Review
