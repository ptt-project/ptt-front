import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import t from '~/locales'

const { Text, Title } = Typography

const SellerMyProduct: FC = () => {
  const router: NextRouter = useRouter()

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('accountProfile.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('shopPoint.shop') },
          { title: t('shopPoint.title'), href: '/seller/settings/shop/point' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}>
             
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerMyProduct
