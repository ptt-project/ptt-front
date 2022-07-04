import React from 'react'
import { Col, Typography, Form, Button, Row, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import AddressForm from '../AddressForm'
import styles from '../../Address.module.scss'
import t from '~/locales'
import { IAddressFormValues } from '~/model/Address'
import { CustomUrl } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'

const { Text } = Typography

const AddAddress: React.FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()

  function onSubmit(values: IAddressFormValues): void {
    console.log(values)
  }

  function onSubmitClick(): void {
    form.submit()
    notification.success({
      message: 'Add Address Success'
    })
    router.replace(CustomUrl.href('/settings/account/address', router.locale))
  }

  function onCancelClick(): void {
    router.replace(CustomUrl.href('/settings/account/address', router.locale))
  }

  return (
    <main className="main account">
      <Helmet>
        <title>
          {t('meta.title')} | {t('address.addAddressTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('address.breadcrumbs.setting') },
          { title: t('address.breadcrumbs.account') },
          {
            title: t('address.breadcrumbs.addAddress'),
            href: CustomUrl.href('/settings/account/address', router.locale)
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
              md={24}
            >
              <Col className="mb-4" span={24}>
                <Text className={`title title-center ${styles.title}`}>
                  <h4>{t('address.addAddressTitle')}</h4>
                </Text>
              </Col>
              <AddressForm parentForm={form} onSubmit={onSubmit} isSeller={false} />
              <Row className="flex-1 mt-5" gutter={[24, 0]}>
                <Col span={12}>
                  <Button type="text" size="large" onClick={onCancelClick} block>
                    {t('common.cancel')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    onClick={onSubmitClick}
                    block
                  >
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

export default AddAddress
