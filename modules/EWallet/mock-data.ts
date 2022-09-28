import { sample, times } from 'lodash'
import moment from 'moment'
import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IWalletTransaction } from '~/interfaces'

export const eWalletHistory: IWalletTransaction[] = times(50).map(
  (v: any, id: number): IWalletTransaction => ({
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
    id,
    detail: '',
    walletId: id,
    updatedAt: moment().format(),

    type: sample([EWalletTypeEnum.WITHDRAW, EWalletTypeEnum.DEPOSIT])
  })
)
