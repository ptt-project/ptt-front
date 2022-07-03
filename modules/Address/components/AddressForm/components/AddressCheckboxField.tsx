import { Button, Checkbox, Image, Space } from 'antd'
import React from 'react'
import styles from '../AddressForm.module.scss'

interface IAddressCheckboxFieldProps {
  label: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
}
const AddressCheckboxField: React.FC<IAddressCheckboxFieldProps> = (
  props: IAddressCheckboxFieldProps
) => {
  const { label, value, onChange, onHintClick } = props

  function handleChange(): void {
    onChange?.(!value)
  }

  return (
    <Space>
      <Checkbox value={!!value} onClick={handleChange}>
        {label}
      </Checkbox>
      {onHintClick && (
        <Button className={styles.hint} type="link" onClick={onHintClick}>
          <Image preview={false} src="./images/main/buyer/icon-hint.svg" />
        </Button>
      )}
    </Space>
  )
}

export default AddressCheckboxField
