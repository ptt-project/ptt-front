import React from 'react'
import { Col, Typography, Form, Button } from 'antd'
import AddressForm, { IAddressFormValues } from '../AddessForm'
import styles from '../../Address.module.scss'
import t from '~/locales'

const { Text } = Typography

const EditAddress: React.FC = () => {
  const [form] = Form.useForm()

  const title: string = 'เพิ่มที่อยู่'

  function onSubmit(values: IAddressFormValues): void {
    console.log(values)
  }

  function onSubmitClick(): void {
    form.submit()
  }

  return (
    <Col>
      <Text className={`title title-center ${styles.title}`}>
        <h4>{title}</h4>
      </Text>
      <AddressForm
        parentForm={form}
        initialValues={{
          fullName: 'นายทดสอบ การทำงาน',
          addressType: 'home',
          isDefault: true,
          postalCode: '73150',
          mobileNo: '0900000000'
        }}
        onSubmit={onSubmit}
      />
      <Button
        className={styles.button}
        type="primary"
        htmlType="submit"
        size="large"
        onClick={onSubmitClick}
        block
      >
        {t('auth.changePassword.button.submit')}
      </Button>
    </Col>
  )
}

export default EditAddress
