import { takeRight } from 'lodash'

export const HelperCensorBankAccountNoUtil = (bankAccountNo: string): string =>
  `*${takeRight(bankAccountNo, 4).join('')}`
