import React, { FC, useState } from 'react'
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

const detail: IMockData = {
  countPerson: 10,
  countPersonStatus: true,
  countOrder: 8,
  countOrderStatus: false,
  totalSale: 5,
  totalSaleStatus: true,
  scoreRate: 6,
  scoreRateStatus: false,
  failedOrderRate: 7,
  failedOrderRateStatus: false,
  delayedDeliveryRate: 6,
  delayedDeliveryRateStatus: true
}

const SellerShopRecommended: FC<ISellerShopRecommendedProps> = (
  props: ISellerShopRecommendedProps
) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.shop-recommended'])
  // const [detail, setDetail] = useState<ISellerShopRecommended>(props.shopRecommended)
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
                <Col span={3} className="text-right mr-2">
                  <Text type="danger">{t('seller.shop-recommended:myShop')}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text type="danger">{t('seller.shop-recommended:target')}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Text type="danger">{t('seller.shop-recommended:status')}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Text>{t('seller.shop-recommended:countPerson')}</Text>
                </Col>
                <Col span={3} className="text-right mr-2">
                  <Text>{detail.countPerson}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text>{t('seller.shop-recommended:countPersonTarget')}</Text>
                </Col>
                <Col span={3} className="text-center ">
                  <Checkbox
                    checked={detail.countPersonStatus}
                    disabled={detail.countPersonStatus}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Text>{t('seller.shop-recommended:countOrder')}</Text>
                </Col>
                <Col span={3} className="text-right mr-2">
                  <Text>{detail.countOrder}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text>{t('seller.shop-recommended:countOrderTarget')}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Checkbox checked={detail.countOrderStatus} disabled={detail.countOrderStatus} />
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Text>{t('seller.shop-recommended:totalSale')}</Text>
                </Col>
                <Col span={3} className="text-right mr-2">
                  <Text>{detail.totalSale}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text>{t('seller.shop-recommended:totalSaleTarget')}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Checkbox checked={detail.totalSaleStatus} disabled={detail.totalSaleStatus} />
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Text>{t('seller.shop-recommended:scoreRate')}</Text>
                </Col>
                <Col span={3} className="text-right mr-2">
                  <Text>{detail.scoreRate}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text>{t('seller.shop-recommended:scoreRateTarget')}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Checkbox checked={detail.scoreRateStatus} disabled={detail.scoreRateStatus} />
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Text>{t('seller.shop-recommended:failedOrderRate')}</Text>
                </Col>
                <Col span={3} className="text-right mr-2">
                  <Text>{detail.failedOrderRate}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text>{t('seller.shop-recommended:failedOrderRateTarget')}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Checkbox
                    checked={detail.failedOrderRateStatus}
                    disabled={detail.failedOrderRateStatus}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Text>{t('seller.shop-recommended:delayedDeliveryRate')}</Text>
                </Col>
                <Col span={3} className="text-right mr-2">
                  <Text>{detail.delayedDeliveryRate}</Text>
                </Col>
                <Col span={6} className="ml-2">
                  <Text>{t('seller.shop-recommended:delayedDeliveryRateTarget')}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Checkbox
                    checked={detail.delayedDeliveryRateStatus}
                    disabled={detail.delayedDeliveryRateStatus}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerShopRecommended
