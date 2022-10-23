import { takeRight } from 'lodash'
import { ImageSizeEnum } from '~/enums'

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

export const HelperMobileFormatUtil = (mobile: string): string =>
  `${mobile.slice(0, 3)}-${mobile.slice(3, 6)}-${mobile.slice(6, 10)}`

export const HelperGetImageUtil = (imageId: string, size: ImageSizeEnum): string =>
  `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/images/${imageId}/${size}`
