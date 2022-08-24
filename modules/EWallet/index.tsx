import React from 'react'
import { Typography, Row, Col } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import styles from './EWallet.module.scss'
import { CustomUrlUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import BalanceCard from './components/BalanceCard'
import EWalletHistory from './components/EWalletHistory'

const { Title } = Typography

const EWallet: React.FC = () => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const balance: number = 3999

  function onTopUpClick(): void {
    router.push('/settings/finance/e-wallet/top-up', '/settings/finance/e-wallet/top-up', {
      locale: router.locale
    })
  }

  function onWithdrawClick(): void {
    router.push('/settings/finance/e-wallet/withdraw', '/settings/finance/e-wallet/withdraw', {
      locale: router.locale
    })
  }

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('e-wallet:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('e-wallet:breadcrumbs.setting') },
          { title: t('e-wallet:breadcrumbs.finance') },
          {
            title: t('e-wallet:breadcrumbs.eWallet'),
            href: CustomUrlUtil('/settings/finance/e-wallet', router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row className={styles.contentLayout} gutter={[0, 16]}>
                <Col span={24}>
                  <Title className={styles.sectionTitle} level={4}>
                    {t('e-wallet:title')}
                  </Title>
                  <BalanceCard
                    balance={balance}
                    onTopUpClick={onTopUpClick}
                    onWithdrawClick={onWithdrawClick}
                  />
                </Col>
                <Col span={24}>
                  <Title className={styles.sectionTitle} level={4}>
                    {t('e-wallet:history.title')}
                  </Title>
                  <EWalletHistory />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

EWallet.defaultProps = {
  isSeller: false
}

export default EWallet
