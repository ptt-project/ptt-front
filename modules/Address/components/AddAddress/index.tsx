import React from 'react'
import Helmet from 'react-helmet'
import AddressForm from '../AddressForm'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { Col, Typography, Form, Button, Row, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { IAddressFormValues, ICreateAddress } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { MemberService } from '~/services'

const { Title } = Typography

interface IAddAddressProps {
  isSeller?: boolean
  googleMapsApiKey: string
}
const AddAddress: React.FC<IAddAddressProps> = (props: IAddAddressProps) => {
  const { googleMapsApiKey, isSeller } = props
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'address', 'setting-sidebar'])

  const [form] = Form.useForm()
  const rootMenu: string = isSeller ? '/seller' : ''
  const prefixMenu: string = isSeller ? 'management' : 'account'

  async function onSubmit(values: IAddressFormValues): Promise<void> {
    const payload: ICreateAddress = {
      ...values,
      isHome: values.addressType === 'home',
      isWork: values.addressType === 'work'
    }
    try {
      await MemberService.createAddress(payload)

      message.success(t('common:dataUpdated'))
      router.replace(`${rootMenu}/settings/${prefixMenu}/address`)
    } catch (error) {
      message.error(t('Fail'))
    }
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
        items={
          props.isSeller
            ? [
                { title: t('setting-sidebar:seller.management.title') },
                {
                  title: t('setting-sidebar:seller.management.address'),
                  href: `${rootMenu}/settings/${prefixMenu}/address`
                },
                { title: t('address:breadcrumbs.addAddress') }
              ]
            : [
                { title: t('address:breadcrumbs.setting') },
                { title: t('address:breadcrumbs.account') },
                {
                  title: t('address:breadcrumbs.address'),
                  href: `${rootMenu}/settings/${prefixMenu}/address`
                },
                { title: t('address:breadcrumbs.addAddress') }
              ]
        }
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType={isSeller ? 'seller' : 'buyer'} />
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
              <AddressForm
                parentForm={form}
                onSubmit={onSubmit}
                isSeller={isSeller}
                googleMapsApiKey={googleMapsApiKey}
              />
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
