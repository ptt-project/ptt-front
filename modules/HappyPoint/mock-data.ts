import { sample, times } from 'lodash'
import moment from 'moment'
import { HappyPointStatusEnum, HappyPointTypeEnum } from '~/enums'
import { IHappyPointHistoryData } from '~/interfaces'

export const happyPointHistory: IHappyPointHistoryData[] = times(50).map(
  (): IHappyPointHistoryData => ({
    amount: Math.random() * 1000,
    createdAt: moment()
      .subtract(Math.random() * 1000 * 60, 'minute')
      .format(),
    status: sample([
      HappyPointStatusEnum.CANCELED,
      HappyPointStatusEnum.FAILED,
      HappyPointStatusEnum.PENDING,
      HappyPointStatusEnum.SUCCESS
    ]),
    type: sample([HappyPointTypeEnum.SELL, HappyPointTypeEnum.BUY, HappyPointTypeEnum.TRANSFER])
  })
)
