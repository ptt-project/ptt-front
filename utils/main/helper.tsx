import { takeRight } from 'lodash'

export const sensorBankAccountNo = (bankAccountNo: string): string =>
  `*${takeRight(bankAccountNo, 4).join('')}`
