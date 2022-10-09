import React, { FC } from 'react'
import Link from 'next/link'
import Helmet from 'react-helmet'
import Breadcrumbs from '../../../../components/main/Breadcrumbs'
import SettingSidebar from '../../../../components/main/SettingSidebar'
import FlashSaleFilter from './components/FlashSaleFilter'
import FlashSaleTable from './components/FlashSaleTable'
import styles from './FlashSale.module.scss'
import { useTranslation } from 'next-i18next'
import { Button, Col, Row, Tabs, Typography } from 'antd'
import { LocaleNamespaceConst } from '../../../../constants'

const { Title } = Typography

const FlashSale: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.product:list.myProduct')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.marketing:title'), href: '/seller/settings/marketing' },
          { title: t('seller.marketing:flashSale.title') }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Row>
                <Col span={24}>
                  <div className={styles.header}>
                    <Title className={styles.title} level={4}>
                      {t('seller.marketing:flashSale.title')}
                    </Title>
                    <Link href="/seller/settings/marketing/flash-sale/add" passHref>
                      <Button type="primary">
                        <i className="fas fa-plus mr-2" />
                        {t('seller.marketing:flashSale.button')}
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Tabs>
                    <Tabs.TabPane tab={t('seller.marketing:flashSale.tab.a')} key="item-1">
                      <FlashSaleFilter />
                      <FlashSaleTable />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t('seller.marketing:flashSale.tab.b')} key="item-2">
                      <FlashSaleFilter />
                      <FlashSaleTable />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t('seller.marketing:flashSale.tab.c')} key="item-3">
                      <FlashSaleFilter />
                      <FlashSaleTable />
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default FlashSale
