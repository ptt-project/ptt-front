import { Image } from 'antd'
import React, { FC, useMemo } from 'react'
import { BankAccountNameEnum } from '~/enums'

interface IBankLogoProps {
  bank: BankAccountNameEnum
}
const BankLogo: FC<IBankLogoProps> = (props: IBankLogoProps) => {
  const { bank } = props
  const bankLogoPath: string = useMemo(() => `${bank.toLowerCase()}.svg`, [bank])
  return <Image preview={false} src={`./images/main/buyer/bank-logo/${bankLogoPath}`} />
}

export default BankLogo
