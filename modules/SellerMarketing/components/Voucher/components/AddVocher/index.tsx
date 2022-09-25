import React from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Form } from 'antd'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import HighlightLabel from '~/components/main/HighlightLabel'
import VoucherForm from '../VoucherForm'
import { IVoucherFormData } from '~/interfaces'
import styles from './AddVocher.module.scss'

const { Text } = Typography

const AddVocher: React.FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [form] = Form.useForm()

  function onSubmit(values: IVoucherFormData): void {
    const newVoucherData: IVoucherFormData = { ...values }
    console.log(newVoucherData)
  }
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
            href: '/seller/settings/marketing/add-voucher'
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
              <VoucherForm parentForm={form} onSubmit={onSubmit} />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default AddVocher
