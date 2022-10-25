import React from 'react'
import styles from '../AddressForm.module.scss'
import { Button, Checkbox, Image, Space } from 'antd'

interface IAddressCheckboxFieldProps {
  label: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}

const AddressCheckboxField: React.FC<IAddressCheckboxFieldProps> = (
  props: IAddressCheckboxFieldProps
) => {
  const { label, value, onChange, onHintClick, disabled } = props

  function handleChange(): void {
    onChange?.(!value)
  }

  return (
    <Space className={styles.checkBoxLayout} direction="horizontal">
      <Checkbox
        checked={!!value}
        defaultChecked={!!value}
        onClick={handleChange}
        disabled={disabled}
      >
        {label}
      </Checkbox>
      {onHintClick && (
        <Button className={styles.hint} type="link" onClick={onHintClick}>
          <Image preview={false} src="./images/main/buyer/icon-hint.svg" alt="icon-hint" />
        </Button>
      )}
    </Space>
  )
}

AddressCheckboxField.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default AddressCheckboxField
