import { HappyPointStatusEnum, HappyPointTypeEnum } from '~/enums'

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
