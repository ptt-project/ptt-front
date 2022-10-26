import { HappyPointStatusEnum, HappyPointTypeEnum } from '~/enums'
import { IBaseEntity } from './common.interface'

export interface IHappyPoint extends IBaseEntity {
  balance: number
  limitTransfer: number
  memberId: string
}

export interface IHappyPointHistoryData {
  id?: string
  description?: string
  amount: number
  createdAt: string
  status: HappyPointStatusEnum
  type: HappyPointTypeEnum
}

export interface IHappyPointFormValues {
  date: moment.Moment
  happyPointAmount: number
  receiverCode?: string
}

export interface IBuyHappyPointParams {
  amount: number
  point: number
  refId: string
  otpCode: string
  refCode: string
}

export interface ISellHappyPointParams {
  point: number
  totalAmount: number
  feeAmount: number
  amount: number
  refId: string
  otpCode: string
  refCode: string
}

export interface ITransferHappyPointParams {
  toMemberUsername: string
  totalPoint: number
  feePoint: number
  point: number
  refId: string
  otpCode: string
  refCode: string
}

export interface IInquiryHappyPointLookupResponse {
  exchangeRate: number
  refId: string
}
