import React, { useState, useEffect, FC } from 'react'
import { useTranslation } from 'next-i18next'
import moment from 'moment'
import numeral from 'numeral'
import { Typography, Row, Col, Space, Carousel, Tag } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import styles from './Promotion.module.scss'

const { Text, Title, Link } = Typography

const Promotion: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'home'])

  let timer: NodeJS.Timer = null
  const [currentTime, setCurrentTime] = useState<string>(moment().format('HH : mm : ss'))

  useEffect(() => {
    initCountdown()

    return () => {
      clearInterval(timer)
    }
  }, [])

  function initCountdown(): void {
    timer = setInterval(() => {
      setCurrentTime(moment().format('HH : mm : ss'))
    }, 1000)
  }

  function renderImages(): JSX.Element[] {
    const images: string[] = []
    for (let i: number = 0; i < 18; i++) {
      images.push('https://dummyimage.com/800x800?text=800 x 800')
    }
    const items: JSX.Element[] = images.map((src: string, index: number) => (
      <div className={styles.box} key={index} style={{ width: 148.5 }}>
        <div className={styles.imgContainer}>
          <div className={styles.imgWrapper}>
            <img src={src} alt="product" />
          </div>
          <Tag color="red" className={styles.tag}>
            <i className="fas fa-angle-double-down mr-2" />
            XX%
          </Tag>
        </div>
        <div className={styles.detailContainer}>
          <Text className={styles.dTitle} type="secondary">
            Mock Up Title XXXXXXXXXXXXXXXXXXXX
          </Text>
          <Text className={styles.dAmount}>฿{numeral(5555).format('0,0')}</Text>
          <Text className={`${styles.dSold} hps-text-small`} type="secondary">
            {t('home:promotion.sold')} {numeral(10).format('0,0')}
          </Text>
        </div>
      </div>
    ))
    return items
  }

  return (
    <>
      <Row className={styles.header} align="middle">
        <Col span={16}>
          <Space className={styles.space} align="center" size="middle">
            <Title className={styles.title} level={3}>
              {t('home:promotion')}
            </Title>
            <Text type="secondary">
              <i className="fas fa-clock mr-1" />
              {currentTime}
            </Text>
          </Space>
        </Col>
        <Col className="text-right" span={8}>
          <Link href="#">
            <a className="hps-link">{t('common:viewAll')}</a>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Carousel
            className={styles.slider}
            swipeToSlide
            draggable
            autoplay
            infinite
            variableWidth
            dots={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {renderImages()}
          </Carousel>
        </Col>
      </Row>
    </>
  )
}

export default Promotion
