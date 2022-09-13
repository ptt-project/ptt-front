import React, { FC } from 'react'
import { Avatar, Col, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { LocaleNamespaceConst } from '../../constants'
import styles from './Shop.module.scss'

const { Text, Title } = Typography

const Shop: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'shop'])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row className={styles.card} align="middle">
          <Col xl={10} lg={11} md={24} xs={24}>
            <Space className={styles.boxHWrapper} size="large">
              <Avatar className={styles.avatar} size={80} />
              <div className={styles.name}>
                <Title level={5}>Fantasy Flight</Title>
                <div className={styles.boxH}>
                  <div>
                    <Text className={`${styles.text} mr-1`}>50</Text>
                    <Text>{t('shop:follower')}</Text>
                  </div>
                  <div className={styles.divider} style={{ height: 'auto' }} />
                  <div>
                    <Text className={`${styles.text} mr-1`}>145</Text>
                    <Text>{t('shop:following')}</Text>
                  </div>
                </div>
              </div>
            </Space>
          </Col>
          <Col xl={14} lg={13} md={24} xs={24}>
            <div className={styles.boxVWrapper}>
              <div className={`${styles.boxV} ${styles.bd}`}>
                <Text>{t('shop:numOfProduct')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-box mr-1" />
                    142
                  </Text>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.boxV}>
                <Text>{t('shop:rating')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-star mr-1" />
                    4.7
                  </Text>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.boxV} ${styles.bd}`}>
                <Text>{t('shop:replyRate')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-comment-dots mr-1" />
                    97%
                  </Text>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.boxV}>
                <Text>{t('shop:replyTime.title')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-clock mr-1" />
                    {t('shop:replyTime.head')} 10 {t('shop:replyTime.tail')}
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Shop
