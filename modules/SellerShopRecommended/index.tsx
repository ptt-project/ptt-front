import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Checkbox } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import { ISellerShopRecommended } from '~/interfaces'
import styles from './SellerShopRecommended.module.scss'

const { Text, Title } = Typography

interface ISellerShopRecommendedProps {
  shopRecommended?: ISellerShopRecommended
}

interface IMockData {
  id: number
  countPerson: number
  countPersonStatus: boolean
  countOrder: number
  countOrderStatus: boolean
  totalSale: number
  totalSaleStatus: boolean
  scoreRate: number
  scoreRateStatus: boolean
  failedOrderRate: number
  failedOrderRateStatus: boolean
  delayedDeliveryRate: number
  delayedDeliveryRateStatus: boolean
}

const shopRecommended: IMockData[] = [
  {
    id: 1,
    countPerson: 5,
    countPersonStatus: true,
    countOrder: 2,
    countOrderStatus: true,
    totalSale: 100,
    totalSaleStatus: true,
    scoreRate: 0.03,
    scoreRateStatus: false,
    failedOrderRate: 0.03,
    failedOrderRateStatus: false,
    delayedDeliveryRate: 0.02,
    delayedDeliveryRateStatus: false
  },
  {
    id: 2,
    countPerson: 5,
    countPersonStatus: true,
    countOrder: 2,
    countOrderStatus: true,
    totalSale: 100,
    totalSaleStatus: true,
    scoreRate: 0.03,
    scoreRateStatus: false,
    failedOrderRate: 0.03,
    failedOrderRateStatus: false,
    delayedDeliveryRate: 0.02,
    delayedDeliveryRateStatus: false
  }
]
const SellerShopRecommended: FC<ISellerShopRecommendedProps> = (
  props: ISellerShopRecommendedProps
) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.shop-recommended'])
  console.log(shopRecommended)
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.shop-recommended:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.shop-detail:shop') },
          { title: t('seller.shop-recommended:title'), href: '/seller/settings/shop/recommended' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title text-left" level={4}>
                {t('seller.shop-recommended:title')}
              </Title>
              <Row className={`${styles.hrTitleCol} mb-3`}>
                <Col span={10}>
                  <Text type="danger">{t('seller.shop-recommended:indicators')}</Text>
                </Col>
                <Col span={4}>
                  <Text type="danger">{t('seller.shop-recommended:myShop')}</Text>
                </Col>
                <Col span={6}>
                  <Text type="danger">{t('seller.shop-recommended:target')}</Text>
                </Col>
                <Col span={3}>
                  <Text type="danger">{t('seller.shop-recommended:status')}</Text>
                </Col>
              </Row>
              {shopRecommended?.map((item: IMockData) => (
                <div key={item.id} className="mb-3">
                  <Row>
                    <Col span={10}>
                      <Text>{item.countPerson}</Text>
                    </Col>
                    <Col span={4}>
                      <Text>{item.countPerson}</Text>
                    </Col>
                    <Col span={6}>
                      <Text>{item.countPerson}</Text>
                    </Col>
                    <Col span={3}>
                      <Checkbox
                        checked={item.countPersonStatus}
                        disabled={item.countPersonStatus}
                      />
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerShopRecommended
