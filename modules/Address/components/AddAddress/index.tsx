import React from 'react'
import { Col, Typography, Form, Button, Row, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import AddressForm from '../AddressForm'
import styles from '../../Address.module.scss'
import t from '~/locales'
import { IAddressFormValues } from '~/model/Address'

const { Text } = Typography

const AddAddress: React.FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()

  const title: string = 'เพิ่มที่อยู่'

  function onSubmit(values: IAddressFormValues): void {
    console.log(values)
  }

  function onSubmitClick(): void {
    form.submit()
    notification.success({
      message: 'Add Address Success'
    })
    router.replace('/personal-info/address')
  }

  function onCancelClick(): void {
    router.replace('/personal-info/address')
  }

  return (
    <Col>
      <Text className={`title title-center ${styles.title}`}>
        <h4>{title}</h4>
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
  )
}

export default AddAddress
