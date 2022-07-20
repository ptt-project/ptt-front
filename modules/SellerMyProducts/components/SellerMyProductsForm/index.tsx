import React, { FC } from 'react'
import { Typography, Button, Row, Col, Form, Input, Select } from 'antd'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import t from '~/locales'
import Info from './components/Info'
import Features from './components/Features'
import Sales from './components/Sales'

import styles from './SellerMyProductsForm.module.scss'

const { Text } = Typography
interface IFormModel {
  isSeller?: boolean
}
const SellerMyProductsForm: FC = () => {
  const [form] = Form.useForm()
  function onSubmit(values: IFormModel): void {
    console.log(values)
  }
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
          { title: t('sellerProducts.form.addTitle'), href: '/seller/settings/product/add-list' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Text>
                <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                  {t('sellerProducts.form.addTitle')}
                </h4>
              </Text>
              <Form layout="vertical" form={form} name="productForm" onFinish={onSubmit}>
                <Info />
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerMyProductsForm
