import { BankName, BankStatus } from '~/enums'

export interface IBankAccountData {
  id?: string
  fullName: string
  citizenNo: string
  status: BankStatus
  bankFullName: string
  bankName: BankName
  bankAccountName: string
  bankAccountNo: string
  isDefault: boolean
}

export interface IBankOptionData {
  bankFullName: string
  bankName: BankName
}

export type IBankAccountFromValues = IBankAccountData
