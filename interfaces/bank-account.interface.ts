import { BankAccountNameEnum, BankAccountStatusEnum } from '~/enums'

export interface IBankAccountData {
  id?: string
  fullName: string
  citizenNo: string
  status: BankAccountStatusEnum
  bankFullName: string
  bankName: BankAccountNameEnum
  bankAccountName: string
  bankAccountNo: string
  isDefault: boolean
}

export interface IBankOptionData {
  bankFullName: string
  bankName: BankAccountNameEnum
}

export type IBankAccountFromValues = IBankAccountData
