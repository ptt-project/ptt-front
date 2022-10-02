import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import HighlightLabel from '~/components/main/HighlightLabel'
import VoucherForm from '../VoucherForm'
import { IVoucherFormData } from '~/interfaces'
import { voucherMock } from '../mock-data'
import styles from './EditVocher.module.scss'

const { Text } = Typography

const VocherEdit: React.FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const router: NextRouter = useRouter()
  const { voucherId } = router.query
  const voucherData: IVoucherFormData[] = useMemo(() => voucherMock || [], [])
  /* const voucherList: IVoucherFormData = useMemo(
    (): IVoucherFormData => voucherData.find((v: IVoucherFormData) => v.id === voucherId),
    [voucherId, voucherList]
  ) */

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.marketing:voucher.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.marketing:title') },
          {
            title: t('seller.marketing:voucher.title'),
            href: '/seller/settings/marketing/voucher'
          },
          {
            title: t('seller.marketing:voucher.buttonCreate'),
            href: `/seller/settings/marketing/${voucherId}`
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
              <Text>
                <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                  {t('seller.marketing:voucher.form.title')}
                </h4>
              </Text>
              <HighlightLabel title={t('seller.marketing:voucher.form.general')} />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default VocherEdit
