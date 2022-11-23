import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IBaseEntity } from './common.interface'

export interface IWallet extends IBaseEntity {
  memberId: string
  balance: number

  // relation
  transactions?: IWalletTransaction[]
}

export interface IWalletTransaction extends IBaseEntity {
  walletId: string
  type: EWalletTypeEnum
  amount: number
  detail: string
  status: EWalletStatusEnum

  // relation
  wallet?: IWallet
}

export interface IGetWalletHistoryParams {
  limit?: number
  page?: number
  startDate?: Date
  endDate?: Date
  type?: EWalletTypeEnum
}

export interface IWalletDepositQrCodeParams {
  amount: number
}

export type IWalletDepositQrCodeResponse = string // qr code image id ต้องไป get รูปมาอีกรอบ

export interface IWalletWithdrawParams {
  otpCode: string
  refCode: string
  bankAccountId: string
  amount: number
}

export interface IWalletWithdrawResponse {
  [k: string]: any // wait response from backend
}
