import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import styles from './SellerMarketing.module.scss'

const { Text, Title } = Typography

const Landing: FC = () => {
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
              <div className={styles.landing}>
                <Row gutter={[32, 16]}>
                  <Col md={12} xs={24}>
                    <Link href={CustomUrlUtil('/seller/settings/marketing/voucher', router.locale)}>
                      <div className={styles.iconWrapper}>
                        <i className={`fas fa-ticket-alt ${styles.icon}`} />
                        <div className={styles.headerContent}>
                          <Text className={styles.title}>
                            {t('seller.marketing:landing.voucher')}
                          </Text>
                          <Text className={styles.msgDetail} type="secondary">
                            {t('seller.marketing:landing.msgVoucher')}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col md={12} xs={24}>
                    <div className={styles.iconWrapper}>
                      <i className={`fas fa-tag ${styles.icon}`} />
                      <div className={styles.headerContent}>
                        <Text className={styles.title}>
                          {t('seller.marketing:landing.discountPromotion')}
                        </Text>
                        <Text className={styles.msgDetail} type="secondary">
                          {t('seller.marketing:landing.msgDiscountPromotion')}
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} xs={24}>
                    <div className={styles.iconWrapper}>
                      <i className={`fas fa-clock ${styles.icon}`} />
                      <div className={styles.headerContent}>
                        <Text className={styles.title}>
                          {t('seller.marketing:landing.flashSale')}
                        </Text>
                        <Text className={styles.msgDetail} type="secondary">
                          {t('seller.marketing:landing.msgFlashSale')}
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} xs={24}>
                    <div className={styles.iconWrapper}>
                      <i className={`fas fa-bookmark ${styles.icon}`} />
                      <div className={styles.headerContent}>
                        <Text className={styles.title}>
                          {t('seller.marketing:landing.followShop')}
                        </Text>
                        <Text className={styles.msgDetail} type="secondary">
                          {t('seller.marketing:landing.msgFollowShop')}
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Landing
