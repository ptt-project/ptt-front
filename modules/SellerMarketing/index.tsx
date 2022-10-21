import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import styles from './SellerMarketing.module.scss'

const { Text, Title } = Typography

const Landing: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.marketing:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[{ title: t('account-info:setting') }, { title: t('seller.marketing:title') }]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Title className="hps-title" level={4}>
                {t('seller.marketing:title')}
              </Title>
              <Row gutter={[24, 24]}>
                <Col md={12} xs={24}>
                  <Link href="/seller/settings/marketing/voucher">
                    <a className={styles.iconWrapper}>
                      <i className={`fas fa-ticket-alt fa-2x ${styles.icon}`} />
                      <div className="d-block ml-4">
                        <Text className={styles.title}>
                          {t('seller.marketing:landing.voucher')}
                        </Text>
                        <Text className="d-block hps-text-small" type="secondary">
                          {t('seller.marketing:landing.msgVoucher')}
                        </Text>
                      </div>
                    </a>
                  </Link>
                </Col>
                <Col md={12} xs={24}>
                  <a className={styles.iconWrapper}>
                    <i className={`fas fa-tag fa-2x ${styles.icon}`} />
                    <div className="d-block ml-4">
                      <Text className={styles.title}>
                        {t('seller.marketing:landing.discountPromotion')}
                      </Text>
                      <Text className="d-block hps-text-small" type="secondary">
                        {t('seller.marketing:landing.msgDiscountPromotion')}
                      </Text>
                    </div>
                  </a>
                </Col>
                <Col md={12} xs={24}>
                  <Link href="/seller/settings/marketing/flash-sale">
                    <a className={styles.iconWrapper}>
                      <i className={`fas fa-clock fa-2x ${styles.icon}`} />
                      <div className="d-block ml-4">
                        <Text className={styles.title}>
                          {t('seller.marketing:landing.flashSale')}
                        </Text>
                        <Text className="d-block hps-text-small" type="secondary">
                          {t('seller.marketing:landing.msgFlashSale')}
                        </Text>
                      </div>
                    </a>
                  </Link>
                </Col>
                <Col md={12} xs={24}>
                  <a className={styles.iconWrapper}>
                    <i className={`fas fa-bookmark fa-2x ${styles.icon}`} />
                    <div className="d-block ml-4">
                      <Text className={styles.title}>
                        {t('seller.marketing:landing.followShop')}
                      </Text>
                      <Text className="d-block hps-text-small" type="secondary">
                        {t('seller.marketing:landing.msgFollowShop')}
                      </Text>
                    </div>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Landing
