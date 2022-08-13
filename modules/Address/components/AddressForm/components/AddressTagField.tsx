import { Image, Radio, RadioChangeEvent } from 'antd'
import React from 'react'
import styles from '../AddressForm.module.scss'

interface IAddressTagFieldProps {
  value?: string
  onChange?: (e: RadioChangeEvent) => void
}
const AddressTagField: React.FC<IAddressTagFieldProps> = (props: IAddressTagFieldProps) => {
  const { value, onChange } = props

  return (
    <Radio.Group className={styles.addressTagRadioButtonGroup} value={value} onChange={onChange}>
      <Radio.Button className={styles.addressTagRadioButton} value="home">
        {value === 'home' ? (
          <Image preview={false} src="./images/main/buyer/address-tag-home-active.svg" />
        ) : (
          <Image preview={false} src="./images/main/buyer/address-tag-home-inactive.svg" />
        )}
      </Radio.Button>
      <Radio.Button className={styles.addressTagRadioButton} value="work">
        {value === 'work' ? (
          <Image preview={false} src="./images/main/buyer/address-tag-office-active.svg" />
        ) : (
          <Image preview={false} src="./images/main/buyer/address-tag-office-inactive.svg" />
        )}
      </Radio.Button>
    </Radio.Group>
  )
}

AddressTagField.defaultProps = {
  value: undefined,
  onChange: undefined
}

export default AddressTagField
