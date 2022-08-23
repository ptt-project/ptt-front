import { HappyPointStatusEnum, HappyPointTypeEnum } from '~/enums'

export interface IHappyPointHistoryData {
  id?: string
  description?: string
  amount: number
  createdAt: string
  status: HappyPointStatusEnum
  type: HappyPointTypeEnum
}
