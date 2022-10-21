import { Image } from 'antd'
import React, { FC, useMemo, useState } from 'react'
// import { getBankImageBase64 } from '../BankAccountFrom/helper'

interface IBankLogoProps {
  bankShortName: string
}
const BankLogo: FC<IBankLogoProps> = (props: IBankLogoProps) => {
  const { bankShortName: bank } = props
  const [isImageError, setIsImageError] = useState<boolean>(false)
  // return <Image preview={false} src={getBankImageBase64(bank)} />
  const bankLogoPath: string = useMemo(() => `${bank.toLowerCase()}.svg`, [bank])
  return !isImageError ? (
    <Image
      preview={false}
      src={`./images/main/buyer/bank-logo/${bankLogoPath}`}
      alt=""
      onError={(): void => {
        setIsImageError(true)
      }}
    />
  ) : (
    <div />
  )
}

export default BankLogo
