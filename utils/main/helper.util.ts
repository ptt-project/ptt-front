import { takeRight } from 'lodash'

export const HelperCensorBankAccountNoUtil = (bankAccountNo: string): string =>
  `*${takeRight(bankAccountNo, 4).join('')}`

export const HelperDecimalFormatUtil = (
  value: number,
  digit: number = 2,
  locale: 'th-TH' | 'en-EN' = 'en-EN',
  options: Intl.NumberFormatOptions = {}
): string =>
  Number(value || 0).toLocaleString(locale, {
    ...options,
    maximumFractionDigits: digit,
    minimumFractionDigits: digit
  })
