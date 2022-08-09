import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'

export interface IEWalletHistoryData {
  id?: string
  description?: string
  amount: number
  createdAt: string
  status: EWalletStatusEnum
  type: EWalletTypeEnum
}
