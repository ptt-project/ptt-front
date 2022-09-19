import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Avatar, Col, Row, Space, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import { LocaleNamespaceConst } from '../../../../constants'
import { CustomUrlUtil } from '../../../../utils/main'
import styles from './ShopCard.module.scss'

interface IShopCardProps {
  showOptions?: boolean
}

const { Text, Title, Link } = Typography

const ShopCard: FC<IShopCardProps> = (props: IShopCardProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'shop'])
  const router: NextRouter = useRouter()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row className={styles.card} align="middle">
          <Col lg={10} md={24} xs={24}>
            <Space className={styles.boxHWrapper} size="large">
              <Avatar className={styles.avatar} size={80} />
              <div className={styles.name}>
                <Title level={5}>Fantasy Flight</Title>
                <div className={styles.boxH}>
                  <div>
                    <Text className={`${styles.text} mr-1`}>50</Text>
                    <Text>{t('shop:card.follower')}</Text>
                  </div>
                  <div className={styles.divider} style={{ height: 'auto' }} />
                  <div>
                    <Text className={`${styles.text} mr-1`}>145</Text>
                    <Text>{t('shop:card.following')}</Text>
                  </div>
                </div>
              </div>
            </Space>
          </Col>
          <Col lg={14} md={24} xs={24}>
            <div className={styles.boxVWrapper}>
              <div className={`${styles.boxV} ${styles.bd}`}>
                <Text>{t('shop:card.numOfProduct')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-box mr-1" />
                    142
                  </Text>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.boxV}>
                <Text>{t('shop:card.rating')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-star mr-1" />
                    4.7
                  </Text>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.boxV} ${styles.bd}`}>
                <Text>{t('shop:card.replyRate')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-comment-dots mr-1" />
                    97%
                  </Text>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.boxV}>
                <Text>{t('shop:card.replyTime.title')}</Text>
                <div>
                  <Text className={styles.text}>
                    <i className="fas fa-clock mr-1" />
                    {t('shop:card.replyTime.label')} 10 นาที
                  </Text>
                </div>
              </div>
              {props.showOptions && (
                <div className={styles.boxAction}>
                  <Link className={styles.actionBtn} href={CustomUrlUtil('/shop', router.locale)}>
                    <i className="fas fa-eye" />
                  </Link>
                  <Text type="secondary" className={styles.actionBtn}>
                    <i className="fas fa-bookmark" />
                  </Text>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ShopCard.defaultProps = {
  showOptions: false
}

export default ShopCard
