import React, { useMemo } from 'react'
import { Col, Typography, Form, Button, Row, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import AddressForm from '../AddressForm'
import t from '~/locales'
import { IAddressFormValues } from '~/model/Address'
import addressesMock from '../AddressForm/mock-data/mock-addresses.json'
import { CustomUrl } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'

const { Title } = Typography

interface IEditAddressProps {
  isSeller?: boolean
}
const EditAddress: React.FC<IEditAddressProps> = (props: IEditAddressProps) => {
  const [form] = Form.useForm()
  const router: NextRouter = useRouter()
  const { addressId } = router.query
  const rootMenu: string = props.isSeller ? '/seller' : ''
  const addresses: IAddressFormValues[] = (addressesMock || []) as IAddressFormValues[]

  const address: IAddressFormValues = useMemo(
    (): IAddressFormValues => addresses.find((v: IAddressFormValues) => v.id === addressId),
    [addressId]
  )

  function onSubmit(values: IAddressFormValues): void {
    console.debug(values)

    // props.updateAddress?.(values)
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
          {t('meta.title')} | {t('address.editAddressTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('address.breadcrumbs.setting') },
          { title: t('address.breadcrumbs.account') },
          {
            title: t('address.breadcrumbs.editAddress'),
            href: CustomUrl.href(`${rootMenu}/settings/account/address`, router.locale)
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
              <Col className="mb-4" span={24}>
                <Title className="hps-title" level={4}>
                  {t('address.editAddressTitle')}
                </Title>
              </Col>
              <AddressForm
                parentForm={form}
                initialValues={{
                  ...address
                }}
                onSubmit={onSubmit}
                isSeller={props.isSeller}
              />
              <Row className="flex-1 mt-5" gutter={[24, 0]}>
                <Col span={12}>
                  <Button type="text" onClick={onCancelClick} block>
                    {t('common.cancel')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" onClick={onSaveClick} block>
                    {t('common.save')}
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
EditAddress.defaultProps = {
  isSeller: false
}

export default EditAddress
