import React, { Suspense, useEffect, useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import AddressForm from '../AddressForm'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { Col, Typography, Form, Button, Row, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { IAddress, IAddressFormValues, IApiResponse, IUpdateAddress } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { MemberService } from '~/services'

const { Title } = Typography

export interface IEditAddressProps {
  isSeller?: boolean
  address?: IAddress | null
  googleMapsApiKey: string
}

const EditAddress: React.FC<IEditAddressProps> = (props: IEditAddressProps) => {
  const { address: addressFromServerSide, googleMapsApiKey, isSeller } = props
  const [form] = Form.useForm()
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'address', 'setting-sidebar'])
  const [address, setAddress] = useState<IAddress>(addressFromServerSide)

  const { addressId } = router.query

  const rootMenu: string = isSeller ? '/seller' : ''
  const prefixMenu: string = isSeller ? 'management' : 'account'

  useEffect(() => {
    const fetchAddresses = async (): Promise<void> => {
      if (!addressFromServerSide) {
        try {
          const { data }: IApiResponse = await MemberService.getAddress(addressId.toString())
          setAddress(data)
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchAddresses()
  }, [addressFromServerSide, addressId])

  async function onSubmit(values: IAddressFormValues): Promise<void> {
    try {
      if (addressId && typeof addressId === 'string') {
        const payload: IUpdateAddress = {
          ...values,
          isHome: values.addressType === 'home',
          isWork: values.addressType === 'work'
        }
        await MemberService.updateAddress(addressId, payload)
        message.success(t('common:dataUpdated'))
        router.replace(`${rootMenu}/settings/${prefixMenu}/address`)
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
    const { isHome } = address || {}
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
        items={
          props.isSeller
            ? [
                { title: t('setting-sidebar:seller.management.title') },
                {
                  title: t('setting-sidebar:seller.management.address'),
                  href: `${rootMenu}/settings/${prefixMenu}/address`
                },
                { title: t('address:breadcrumbs.editAddress') }
              ]
            : [
                { title: t('address:breadcrumbs.setting') },
                { title: t('address:breadcrumbs.account') },
                {
                  title: t('address:breadcrumbs.address'),
                  href: `${rootMenu}/settings/${prefixMenu}/address`
                },
                { title: t('address:breadcrumbs.editAddress') }
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
              <Col className="mb-4" span={24}>
                <Title className="hps-title" level={4}>
                  {t('address:editAddressTitle')}
                </Title>
              </Col>
              <Suspense fallback={<div>Loading...</div>}>
                {address && (
                  <AddressForm
                    parentForm={form}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    isSeller={isSeller}
                    googleMapsApiKey={googleMapsApiKey}
                  />
                )}
              </Suspense>
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
