import { sample, times } from 'lodash'
import moment from 'moment'
import { EWalletStatusEnum, EWalletTypeEnum } from '~/enums'
import { IWalletTransaction } from '~/interfaces'

export const eWalletHistory: IWalletTransaction[] = times(50).map(
  (v: any, id: number): IWalletTransaction => ({
    amount: Math.random() * 1000,
    createdAt: moment()
      .subtract(Math.random() * 1000 * 60, 'minute')
      .toDate(),
    status: sample([
      EWalletStatusEnum.CANCELED,
      EWalletStatusEnum.FAILED,
      EWalletStatusEnum.PENDING,
      EWalletStatusEnum.SUCCESS
    ]),
    id: id.toString(),
    detail: '',
    walletId: id.toString(),
    updatedAt: moment().toDate(),

    type: sample([EWalletTypeEnum.WITHDRAW, EWalletTypeEnum.DEPOSIT])
  })
)
