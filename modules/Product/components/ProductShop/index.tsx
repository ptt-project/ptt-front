import React, { FC } from 'react'
import { Avatar, Button, Col, Row, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import styles from './ProductShop.module.scss'
import { LocaleNamespaceConst } from '../../../../constants'

const { Title, Text } = Typography

const ProductShop: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'product'])

  return (
    <Row>
      <Col md={12} xs={24}>
        <div className={styles.infoLeft}>
          <Avatar className={styles.avatar} size={80} />
          <div className={styles.infoLeftWrapper}>
            <Title className={`${styles.dwrap} mb-2`} level={5}>
              Fantasy Flight
            </Title>
            <Text className="mb-2">Active 1 ชั่วโมงที่ผ่านมา</Text>
            <div className={styles.btnGroup}>
              <Button className="hps-btn-secondary">
                <i className="fas fa-comment-dots mr-1" />
                {t('product:main.shop.chat')}
              </Button>
              <Button className="hps-btn-secondary">
                <i className="fas fa-eye mr-1" />
                {t('product:main.shop.view')}
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col md={12} xs={24}>
        <div className={styles.infoRight}>
          <div className={styles.infoBox}>
            <Text className={styles.dwrap}>{t('product:main.shop.rating')}</Text>
            <div className={styles.dwrap}>
              <Text className={styles.text}>
                <i className="fas fa-star mr-1" />
                4.7
              </Text>
            </div>
          </div>
          <div className={styles.infoBox}>
            <Text className={styles.dwrap}>{t('product:main.shop.joinAt')}</Text>
            <div className={styles.dwrap}>
              <Text className={styles.text}>
                <i className="fas fa-calendar mr-1" />
                22 เดือนที่ผ่านมา
              </Text>
            </div>
          </div>
          <div className={styles.infoBox}>
            <Text className={styles.dwrap}>{t('product:main.shop.follower')}</Text>
            <div className={styles.dwrap}>
              <Text className={styles.text}>
                <i className="fas fa-bookmark mr-1" />
                1.2 พัน
              </Text>
            </div>
          </div>
          <div className={styles.infoBox}>
            <Text className={styles.dwrap}>{t('product:main.shop.replyRate')}</Text>
            <div className={styles.dwrap}>
              <Text className={styles.text}>
                <i className="fas fa-comment-dots mr-1" />
                95%
              </Text>
            </div>
          </div>
          <div className={styles.infoBox}>
            <Text className={styles.dwrap}>{t('product:main.shop.replyTime.title')}</Text>
            <div className={styles.dwrap}>
              <Text className={styles.text}>
                <i className="fas fa-clock mr-1" />
                {t('product:main.shop.replyTime.label')} 10 นาที
              </Text>
            </div>
          </div>
          <div className={styles.infoBox}>
            <Text className={styles.dwrap}>{t('product:main.shop.quantity')}</Text>
            <div className={styles.dwrap}>
              <Text className={styles.text}>
                <i className="fas fa-box mr-1" />
                142
              </Text>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ProductShop
