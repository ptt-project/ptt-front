import React, { useEffect, useMemo } from 'react'
import { Col, Typography, Form, Button, Row, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import AddressForm from '../AddressForm'
import styles from '../../Address.module.scss'
import t from '~/locales'
import { IAddressFormValues } from '~/model/Address'
import addresses from '../AddressForm/mock-data/mock-addresses.json'
import { CustomUrl } from '~/utils/main'

const { Text } = Typography

const EditAddress: React.FC = () => {
  const router: NextRouter = useRouter()
  const { addressId } = router.query

  const [form] = Form.useForm()

  const address: IAddressFormValues = useMemo(
    (): IAddressFormValues =>
      (addresses as IAddressFormValues[]).find((v: IAddressFormValues) => v.id === addressId),
    [addressId]
  )

  useEffect(() => {
    console.log(addressId)
  }, [addressId])

  function onSubmit(values: IAddressFormValues): void {
    console.log(values)
  }

  function onSubmitClick(): void {
    form.submit()
    notification.success({
      message: 'Edit Address Success'
    })
    router.replace(CustomUrl.href('/settings/account/address', router.locale))
  }

  function onCancelClick(): void {
    router.replace(CustomUrl.href('/settings/account/address', router.locale))
  }

  return (
    <Row>
      <Col>
        <Text className={`title title-center ${styles.title}`}>
          <h4>{t('address.editAddressTitle')}</h4>
        </Text>
        <AddressForm
          parentForm={form}
          initialValues={{
            ...address
          }}
          onSubmit={onSubmit}
          isSeller={false}
        />
        <Row className={styles.buttonLayout} gutter={24}>
          <Col span={12}>
            <Button type="text" size="large" onClick={onCancelClick} block>
              {t('common.cancel')}
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" htmlType="submit" size="large" onClick={onSubmitClick} block>
              {t('common.save')}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default EditAddress
