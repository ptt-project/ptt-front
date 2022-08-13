import React, { useMemo } from 'react'
import { Col, Typography, Form, Button, Row, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import AddressForm from '../AddressForm'
import { IAddress, IAddressFormValues, IUpdateAddress } from '~/interfaces'
import { CustomUrlUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import { MembersService } from '~/services'

const { Title } = Typography

export interface IEditAddressProps {
  isSeller?: boolean
  address?: IAddress
}
const EditAddress: React.FC<IEditAddressProps> = (props: IEditAddressProps) => {
  const { address } = props
  const [form] = Form.useForm()
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'address'])

  const { addressId } = router.query

  const rootMenu: string = props.isSeller ? '/seller' : ''

  async function onSubmit(values: IAddressFormValues): Promise<void> {
    console.debug({ values })
    try {
      if (addressId && typeof addressId === 'string') {
        const payload: IUpdateAddress = {
          ...values,
          isHome: values.addressType === 'home',
          isWork: values.addressType === 'work'
        }
        await MembersService.updateAddress(addressId, payload)
        message.success(t('common:dataUpdated'))
        router.replace(
          `${rootMenu}/settings/account/address`,
          `${rootMenu}/settings/account/address`,
          {
            locale: router.locale
          }
        )
      }
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

  const initialValues: IAddressFormValues = useMemo((): IAddressFormValues => {
    const { isHome } = address
    return {
      ...address,
      addressType: isHome ? 'home' : 'work'
    }
  }, [address])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('address:editAddressTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('address:breadcrumbs.setting') },
          { title: t('address:breadcrumbs.account') },
          {
            title: t('address:breadcrumbs.editAddress'),
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
              <Col className="mb-4" span={24}>
                <Title className="hps-title" level={4}>
                  {t('address:editAddressTitle')}
                </Title>
              </Col>
              <AddressForm
                parentForm={form}
                initialValues={initialValues}
                onSubmit={onSubmit}
                isSeller={props.isSeller}
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
EditAddress.defaultProps = {
  isSeller: false,
  address: undefined
}

export default EditAddress
