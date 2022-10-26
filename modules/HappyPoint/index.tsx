import React from 'react'
import { Typography, Row, Col } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import styles from './HappyPoint.module.scss'
import { CustomUrlUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import BalanceCard from './components/BalanceCard'
import EWalletHistory from './components/HappyPointHistory'
import { HappyPointService } from '~/services'

const { Title } = Typography

const HappyPoint: React.FC = () => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'happy-point'])
  const { data: happyPoint } = HappyPointService.useGetHappyPointBalance()

  function onBuyClick(): void {
    router.push('/settings/finance/happy-point/buy')
  }

  function onSellClick(): void {
    router.push('/settings/finance/happy-point/sell')
  }

  function onTransferClick(): void {
    router.push('/settings/finance/happy-point/transfer')
  }

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('happy-point:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('happy-point:breadcrumbs.setting') },
          { title: t('happy-point:breadcrumbs.finance') },
          {
            title: t('happy-point:breadcrumbs.happyPoint'),
            href: CustomUrlUtil('/settings/finance/happy-point', router.locale)
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
                    {t('happy-point:title')}
                  </Title>
                  <BalanceCard
                    balance={happyPoint?.balance}
                    onBuyClick={onBuyClick}
                    onSellClick={onSellClick}
                    onTransferClick={onTransferClick}
                  />
                </Col>
                <Col span={24}>
                  <Title className={styles.sectionTitle} level={4}>
                    {t('happy-point:history.title')}
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

HappyPoint.defaultProps = {
  isSeller: false
}

export default HappyPoint
