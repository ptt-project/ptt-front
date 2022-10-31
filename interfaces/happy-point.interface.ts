import { HappyPointStatusEnum, HappyPointTypeEnum } from '~/enums'
import { IBaseEntity, IPaginationResponse } from './common.interface'

export interface IHappyPoint extends IBaseEntity {
  balance: number
  limitTransfer: number
  memberId: string
}

export interface IGetHappyPointHistoryParams {
  filter?: HappyPointTypeEnum
  limit?: number
  page?: number
}

export interface IHappyPointHistoryData extends IBaseEntity {
  description?: string
  amount: number
  createdAt: string
  status: HappyPointStatusEnum
  type: HappyPointTypeEnum

  refId: string
  fromHappyPointId: string
  note: string
  toHappyPointId?: string
  point: number
  totalAmount: number
  exchangeRate: number
  fee: number
  totalPoint: number
  feePoint: number
  memberRemark?: string
}

export type IHappyPointHistoryResponse = IPaginationResponse<IHappyPointHistoryData>

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
  refId: string
  exchangeRate: number
  happyPointBuyRate: number
  happyPointSellRate: number
  happyPointFeePercent: number
  happyPointTransferRate: number
}

export interface IGetHappyPointBalanceResponse {
  balance: number
}
