import React, { FC } from 'react'
import { Button, Row, Col, Form, Input, Select } from 'antd'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import t from '~/locales'

const SellerMyProductsForm: FC = () => {
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
          { title: t('sellerProducts.list.myProduct'), href: '/seller/settings/product/list' },
          { title: t('sellerProducts.list.myProduct'), href: '/seller/settings/product/add-list' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}></Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerMyProductsForm
