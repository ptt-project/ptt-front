import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Button, Col, Row, Space, Tag, Typography } from 'antd'
import Breadcrumbs from '../../components/main/Breadcrumbs'
import ProductGallery from './components/ProductGallery'
import ProductShop from './components/ProductShop'
import ProductComment from './components/ProductComment'
import { LocaleNamespaceConst } from '../../constants'
import styles from './Product.module.scss'

const { Title, Text } = Typography

const Product: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'search', 'product', 'shop'])

  return (
    <div className="main mt-6">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('product:main.title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('product:main.title') }]} />
      <Title className="d-none" level={1}>
        Arkham Horror: The Card Game Revised Core Set
      </Title>
      <div className="page-content">
        <div className="container">
          <Row gutter={24}>
            <Col lg={12} xs={24}>
              <ProductGallery />
            </Col>
            <Col className="mb-4" lg={12} xs={24}>
              <Title className="mb-4" level={4}>
                Arkham Horror: The Card Game Revised Core Set
              </Title>
              <Space className="mb-4" size="middle">
                <Title className={styles.amount} level={4}>
                  ฿2,009
                </Title>
                <Text className={styles.discount} delete type="secondary">
                  ฿2,884
                </Text>
                <Tag color="red">
                  <i className="fas fa-angle-double-down mr-2" />
                  30%
                </Tag>
              </Space>
              <div className="mb-4">
                <Text type="secondary">...do something</Text>
                <br />
                <Text type="secondary">...do something</Text>
                <br />
                <Text type="secondary">...do something</Text>
                <br />
                <Text type="secondary">...do something</Text>
                <br />
                <Text type="secondary">...do something</Text>
              </div>
              <Row className="mb-2">
                <Col span={6}>
                  <Text>{t('product:main.deliveryFrom')}:</Text>
                </Col>
                <Col span={18}>
                  <Text>อำเภอเมืองสมุทรปราการ, จังหวัดสมุทรปราการ</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={6}>
                  <Text>{t('product:main.quantity')}:</Text>
                </Col>
                <Col span={18} />
              </Row>
              <Row>
                <Col span={24}>
                  <div className={styles.btnGroup}>
                    <Button className="hps-btn-secondary">{t('product:main.addToCart')}</Button>
                    <Button type="primary">{t('product:main.buy')}</Button>
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={24}>
                  <Text strong>{t('product:main.information.title')}</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={8}>
                  <Text>{t('product:main.information.category')}:</Text>
                </Col>
                <Col span={16}>
                  <Text>บอร์ดเกม</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={8}>
                  <Text>{t('product:main.information.size')}:</Text>
                </Col>
                <Col span={16}>
                  <Text>ก 28 x ย 48 x ส 55 ซม.</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={8}>
                  <Text>{t('product:main.information.quantity')}:</Text>
                </Col>
                <Col span={16}>
                  <Text>45</Text>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col span={8}>
                  <Text>{t('product:main.information.deliveryFrom')}:</Text>
                </Col>
                <Col span={16}>
                  <Text>อำเภอเมืองสมุทรปราการ, จังหวัดสมุทรปราการ</Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={24}>
              <ProductShop />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ProductComment />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Product
