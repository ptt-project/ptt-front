import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SellerPointFilters from './components/SellerPointFilters'
import SellerPointTabs from './components/SellerPointTabs'
import t from '~/locales'
import styles from './SellerPoint.module.scss'

const { Text, Title } = Typography

const SellerPoint: FC = () => {
  const router: NextRouter = useRouter()

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('profile.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('sellerPoint.shop') },
          { title: t('sellerPoint.title'), href: '/seller/settings/shop/point' }
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
                    {t('sellerPoint.title')}
                  </Title>
                  <Text type="secondary">{t('sellerPoint.detail')}</Text>
                </Col>
                <Col xs={4}>
                  <div className={styles.point}>
                    <Title className={styles.h1} type="danger" level={1}>
                      5.0
                    </Title>
                    <Title className={`${styles.h4} ${styles.space}`} type="secondary" level={4}>
                      /
                    </Title>
                    <Title className={styles.h4} type="secondary" level={4}>
                      {t('sellerPoint.part')}
                    </Title>
                  </div>
                </Col>
              </Row>
              <SellerPointFilters />
              <SellerPointTabs />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerPoint