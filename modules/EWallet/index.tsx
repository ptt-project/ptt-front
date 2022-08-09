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

interface IEWalletProps {
  isSeller?: boolean
}
const EWallet: React.FC<IEWalletProps> = (props: IEWalletProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])
  const rootMenu: string = props.isSeller ? '/seller' : ''
  const balance: number = 3999

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('address:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('address:breadcrumbs.setting') },
          { title: t('address:breadcrumbs.account') },
          {
            title: t('address:breadcrumbs.address'),
            href: CustomUrlUtil(`${rootMenu}/settings/account/address`, router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
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
                    {t('E-Wallet')}
                  </Title>
                  <BalanceCard balance={balance} />
                </Col>
                <Col span={24}>
                  <Title className={styles.sectionTitle} level={4}>
                    {t('ประวัติการทำรายการ')}
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
