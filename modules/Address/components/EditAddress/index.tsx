import React, { useMemo } from 'react'
import { Col, Typography, Form, Button } from 'antd'
import AddressForm from '../AddressForm'
import styles from '../../Address.module.scss'
import t from '~/locales'
import { IAddressFormValues } from '~/model/Address'
import { addresses } from '../..'

const { Text } = Typography

interface IEditAddressProps {
  addressId: string
}

const EditAddress: React.FC<IEditAddressProps> = (props: IEditAddressProps) => {
  const { addressId } = props

  const [form] = Form.useForm()
  const title: string = 'แก้ไขที่อยู่'

  const address: IAddressFormValues = useMemo(
    (): IAddressFormValues => addresses.find((v: IAddressFormValues) => v.id === addressId),
    [addressId]
  )

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
          ...address
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
