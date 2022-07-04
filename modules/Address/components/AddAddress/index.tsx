import React from 'react'
import { Col, Typography, Form, Button, Row, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import AddressForm from '../AddressForm'
import styles from '../../Address.module.scss'
import t from '~/locales'
import { IAddressFormValues } from '~/model/Address'
import { CustomUrl } from '~/utils/main'

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
    <Row>
      <Col>
        <Text className={`title title-center ${styles.title}`}>
          <h4>{t('address.addAddressTitle')}</h4>
        </Text>
        <AddressForm parentForm={form} initialValues={{}} onSubmit={onSubmit} />
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

export default AddAddress
