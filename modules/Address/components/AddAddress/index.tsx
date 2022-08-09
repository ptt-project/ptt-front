import React from 'react'
import { Col, Typography, Form, Button, Row, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import AddressForm from '../AddressForm'
import { IAddressFormValues } from '~/interfaces'
import { CustomUrlUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'

const { Title } = Typography

interface IAddAddressProps {
  isSeller?: boolean
}
const AddAddress: React.FC<IAddAddressProps> = (props: IAddAddressProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'address'])

  const [form] = Form.useForm()
  const rootMenu: string = props.isSeller ? '/seller' : ''

  function onSubmit(values: IAddressFormValues): void {
    console.log(values)
    notification.success({
      message: 'Add Address Success'
    })
    router.replace(`${rootMenu}/settings/account/address`, `${rootMenu}/settings/account/address`, {
      locale: router.locale
    })
  }

  function onSaveClick(): void {
    form.submit()
  }

  function onCancelClick(): void {
    router.back()
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('address:addAddressTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('address:breadcrumbs.setting') },
          { title: t('address:breadcrumbs.account') },
          {
            title: t('address:breadcrumbs.addAddress'),
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
            >
              <Col span={24}>
                <Title className="hps-title" level={4}>
                  {t('address:addAddressTitle')}
                </Title>
              </Col>
              <AddressForm parentForm={form} onSubmit={onSubmit} isSeller={props.isSeller} />
              <Row className="flex-1 mt-5" gutter={[24, 0]}>
                <Col span={12}>
                  <Button type="text" onClick={onCancelClick} block>
                    {t('common:cancel')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" onClick={onSaveClick} block>
                    {t('common:save')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

AddAddress.defaultProps = {
  isSeller: false
}

export default AddAddress
