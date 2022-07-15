import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button,Progress } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SellerMyProductsFilters from './components/SellerMyProductsFilters'
import SellerMyProductsTabs from './components/SellerMyProductsTabs'
import t from '~/locales'
import styles from './SellerMyProducts.module.scss'

const { Text, Title } = Typography

const SellerMyProduct: FC = () => {
  const router: NextRouter = useRouter()

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('sellerProducts.list.myProduct')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('sellerProducts.list.product') },
          { title: t('sellerProducts.list.myProduct'), href: '/seller/settings/product/my' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}>
              <Row className="mb-3" align="middle">
                <Col xs={20}>
                  <Title className={`${styles.h4} ${styles.textSecondary}`} level={4}>
                    {t('sellerProducts.list.product')} 5 {t('sellerProducts.list.list')} 
                  </Title>
                  <div className={styles.progress}>
                    <Progress percent={10} showInfo={false} size="small"/>
                  </div>
                  <Text type="secondary">{t('sellerProducts.list.uploadProduct')} 999 {t('sellerProducts.list.items')}</Text>
                </Col>
                <Col xs={4}>
                  <div className={styles.addNewProduct}>
                    <Button type="primary">
                      <i className="fas fa-plus mr-1"/>{t('sellerProducts.list.addNewProduct')}
                    </Button>
                  </div>
                </Col>
              </Row>
              <SellerMyProductsFilters/>
              <SellerMyProductsTabs/>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerMyProduct
