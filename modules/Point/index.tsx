import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import PointFormSearch from '../Point/components/PointFormSearch'
import t from '~/locales'
import styles from './Point.module.scss'

const { Text } = Typography

const Point: FC = () => {
  const router: NextRouter = useRouter()
  return (
    <main className="main account">
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
              <Row>
                <Col md={20} >
                  <h4 className={`text-left mb-1 ${styles.textSecondary}`}>{t('shopPoint.title')}</h4>
                  <Text type="secondary">{t('shopPoint.detail')}</Text>
                </Col>
                <Col md={4}>
                  <Row>
                    <h2><Text type="danger">5.0</Text></h2>
                    <h4 className="mt-2">
                      <Text type="secondary">{t('shopPoint.part')}</Text>
                    </h4>
                  </Row>
                </Col>
              </Row>
              <PointFormSearch/>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Point
