import { sample, times } from 'lodash'
import moment from 'moment'
import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IEWalletHistoryData } from '~/interfaces'

export const eWalletHistory: IEWalletHistoryData[] = times(5).map(
  (): IEWalletHistoryData => ({
    amount: Math.random() * 1000,
    createdAt: moment()
      .subtract(Math.random() * 1000 * 60, 'minute')
      .format(),
    status: sample([
      EWalletStatusEnum.CANCELED,
      EWalletStatusEnum.FAILED,
      EWalletStatusEnum.PENDING,
      EWalletStatusEnum.SUCCESS
    ]),
    type: sample([EWalletTypeEnum.WITHDRAW, EWalletTypeEnum.TOP_UP])
  })
)
