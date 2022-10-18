import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button, Form, Upload, Input } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { ImageAcceptConst, LocaleNamespaceConst } from '~/constants'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './SellerShopDetail.module.scss'

const { Text, Title } = Typography

const SellerShopDetail: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.shop-detail'])
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.point:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.shop-detail:shop') },
          { title: t('seller.shop-detail:title'), href: '/seller/settings/shop/detail' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('seller.shop-detail:title')}
              </Title>
              <Row>
                <Col md={4} xs={24}>
                  <Form.Item name="image">
                    <Upload accept={ImageAcceptConst.toString()} maxCount={1}>
                      <Button className="hps-btn-secondary">
                        {t('seller.shop-detail:chooseProfile')}
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col md={4} xs={24}>
                  <Form.Item name="image">
                    <Upload accept={ImageAcceptConst.toString()} maxCount={1}>
                      <Button className="hps-btn-secondary">
                        {t('seller.shop-detail:chooseCover')}
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col md={8} xs={32} className="mt-1">
                  <Text type="secondary">{t('seller.shop-detail:msg')}</Text>
                </Col>
              </Row>
              <Row className={` ${styles.list}`} align="middle">
                <Col xs={20}>
                  <i className={`fas fa-box ${styles.icon}`} />
                  <Text>{t('seller.shop-detail:productList')}</Text>
                </Col>
                <Col xs={4}>
                  <Text>
                    5 <i className="fas fa-angle-right" />
                  </Text>
                </Col>
              </Row>
              <Row className={` ${styles.list}`} align="middle">
                <Col xs={20}>
                  <i className={`fas fa-comment-dots ${styles.icon}`} />
                  <Text>{t('seller.shop-detail:responseRate')}</Text>
                </Col>
                <Col xs={4}>
                  <Text>
                    5 <i className="fas fa-angle-right" />
                  </Text>
                </Col>
              </Row>
              <Row className={` ${styles.list}`} align="middle">
                <Col xs={20}>
                  <i className={`fas fa-star ${styles.icon}`} />
                  <Text>{t('seller.shop-detail:rating')}</Text>
                </Col>
                <Col xs={4}>
                  <Text>5</Text>
                </Col>
              </Row>
              <Row className={` ${styles.list}`} align="middle">
                <Col xs={20}>
                  <i className={`fas fa-file-invoice-dollar ${styles.icon}`} />
                  <Text>{t('seller.shop-detail:orderFailed')}</Text>
                </Col>
                <Col xs={4}>
                  <Text>
                    5 <i className="fas fa-angle-right" />
                  </Text>
                </Col>
              </Row>
              <HighlightLabel title={t('seller.shop-detail:shopInfo')} />
              <Form layout="vertical">
                <Col span={24}>
                  <Form.Item
                    label={t('seller.shop-detail:shopName')}
                    name="detail"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={t('seller.shop-detail:shopDetail')}
                    name="detail"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Input.TextArea rows={3} showCount maxLength={500} />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 6 }} xs={24}>
                  <Form.Item>
                    <Button htmlType="submit" type="primary" block>
                      {t('common:save')}
                    </Button>
                  </Form.Item>
                </Col>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default SellerShopDetail
