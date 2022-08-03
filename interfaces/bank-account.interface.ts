import { BankNameEnum, BankStatusEnum } from '~/enums'

export interface IBankAccountData {
  id?: string
  fullName: string
  citizenNo: string
  status: BankStatusEnum
  bankFullName: string
  bankName: BankNameEnum
  bankAccountName: string
  bankAccountNo: string
  isDefault: boolean
}

export interface IBankOptionData {
  bankFullName: string
  bankName: BankNameEnum
}

export type IBankAccountFromValues = IBankAccountData
