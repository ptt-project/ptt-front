import { BankAccountStatusEnum } from '~/enums'
import { IBaseEntity, IOption } from './common.interface'
import { IWalletTransaction } from './e-wallet.interface'

export interface IBankAccountData {
  id?: number
  fullName: string
  citizenNo: string
  status: BankAccountStatusEnum
  bankCode: string
  bankAccountName: string
  bankAccountNo: string
  isDefault: boolean
}

// ยังไม่ final
export interface IBankAccount extends IBaseEntity {
  memberId: number
  fullName: string
  thaiId: string
  bankCode: string
  accountNumber: string
  accountHolder: string
  isMain: boolean

  // relation
  // member: Member
  transactions?: IWalletTransaction[]
}

export interface IBankOptionData {
  bankName: string
  bankCode: string
}

export type IBankAccountFromValues = IBankAccountData

export interface IGetBankAccountsParams {
  otpCode: string
  refCode: string
}

export type IGetBankAccountsResponse = IBankAccount[]

export interface IAddBankAccountParams {
  otpCode: string
  refCode: string
  fullName: string
  thaiId: string
  bankCode: string
  accountNumber: string
  accountHolder: string
}

export type IAddBankAccountResponse = IBankAccount

export interface IEditBankAccountParams {
  otpCode: string
  refCode: string
  fullName: string
  thaiId: string
  bankCode: string
  accountNumber: string
  accountHolder: string
}

export interface IDeleteBankAccountParams {
  otpCode: string
  refCode: string
}

export type IGetBankAccountOptionsResponse = IOption[]
