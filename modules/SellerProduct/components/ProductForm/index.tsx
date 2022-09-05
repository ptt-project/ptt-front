import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Form } from 'antd'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Info from './components/Info'
import Features from './components/Features'
import Sales from './components/Sales'
import Other from './components/Other'
import Delivery from './components/Delivery'
import { LocaleNamespaceConst } from '~/constants'
import styles from './ProductForm.module.scss'

const { Text } = Typography

interface IFormModel {
  isSeller?: boolean
}

const ProductForm: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [form] = Form.useForm()

  function onSubmit(values: IFormModel): void {
    console.log(values)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.product:list.myProduct')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.product:list.product') },
          { title: t('seller.product:list.myProduct'), href: '/seller/settings/product/list' },
          { title: t('seller.product:form.addTitle'), href: '/seller/settings/product/add' }
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
                  {t('seller.product:form.addTitle')}
                </h4>
              </Text>
              <Form
                layout="vertical"
                initialValues={{ platformCategoryId: '', brandId: '', condition: 'new' }}
                form={form}
                name="productForm"
                onFinish={onSubmit}
              >
                <Info />
                <Features />
                <Sales form={form} />
                <Delivery />
                <Other />
                <Row gutter={[16, 8]} className="mt-3">
                  <Col md={{ span: 8, order: 1 }} xs={{ span: 12, order: 2 }}>
                    <Button type="text" block>
                      {t('common:cancel')}
                    </Button>
                  </Col>
                  <Col md={{ span: 8, order: 2 }} xs={{ span: 12, order: 3 }}>
                    <Button type="text" block>
                      {t('seller.product:form.saveHide')}
                    </Button>
                  </Col>
                  <Col md={{ span: 8, order: 3 }} xs={{ span: 24, order: 1 }}>
                    <Button htmlType="submit" type="primary" block>
                      {t('seller.product:form.savePublish')}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default ProductForm
