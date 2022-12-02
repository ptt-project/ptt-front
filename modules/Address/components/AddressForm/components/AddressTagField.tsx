import React from 'react'
import Image from '../../../../../components/main/Image'
import styles from '../AddressForm.module.scss'
import { Radio, RadioChangeEvent } from 'antd'

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
          <Image
            src="./images/main/buyer/address-tag-home-active.svg"
            alt="address-tag-home-active"
          />
        ) : (
          <Image
            src="./images/main/buyer/address-tag-home-inactive.svg"
            alt="address-tag-home-inactive"
          />
        )}
      </Radio.Button>
      <Radio.Button className={styles.addressTagRadioButton} value="work">
        {value === 'work' ? (
          <Image
            src="./images/main/buyer/address-tag-office-active.svg"
            alt="address-tag-office-active"
          />
        ) : (
          <Image
            src="./images/main/buyer/address-tag-office-inactive.svg"
            alt="address-tag-office-inactive"
          />
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
