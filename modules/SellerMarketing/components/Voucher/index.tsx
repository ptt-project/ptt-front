import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import VoucherTabs from './components/VoucherTabs'
import { CustomUrlUtil } from '../../../../utils/main'

import styles from './Voucher.module.scss'

const { Title } = Typography

const Voucher: FC = () => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.marketing:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          {
            title: t('seller.marketing:title'),
            href: '/seller/settings/marketing'
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Row className="mb-3" align="middle">
                <Col xs={20}>
                  <Title className={`${styles.h4} ${styles.textSecondary}`} level={4}>
                    {t('seller.marketing:voucher.title')}
                  </Title>
                </Col>
                <Col xs={4}>
                  <div className={styles.addNewProduct}>
                    <Button
                      type="primary"
                      href={CustomUrlUtil('/seller/settings/marketing/voucher/add', router.locale)}
                    >
                      <i className="fas fa-plus mr-1" />
                      {t('seller.marketing:voucher.buttonCreate')}
                    </Button>
                  </div>
                </Col>
              </Row>
              <VoucherTabs />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Voucher
