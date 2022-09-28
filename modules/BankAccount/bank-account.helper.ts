/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBankOptionData } from '~/interfaces'
import bankOptionsDataJson from './bank-data.json'

interface IBankDataJson {
  symbol: {
    url: string
    imageData: string
    contentType: string
    width: number
    height: number
    angle: number
    xoffset: number
    yoffset: number
  }
  value: string
  nameTh: string
  bankCode: string
  description: string
}

export const bankOptionsData = bankOptionsDataJson.map(
  (d): IBankOptionData => ({
    bankName: d.nameTh,
    bankCode: d.bankCode
  })
)

const bankOptionsHashByBankCode = bankOptionsDataJson.reduce(
  (acc: Record<string, IBankDataJson>, cur) => {
    acc[cur.bankCode] = cur
    return acc
  },
  {}
)

export const getBankImageBase64 = (bankCode: string): string => {
  const { symbol: bankImage } = bankOptionsHashByBankCode[bankCode] || {}
  if (bankImage) {
    const { contentType, imageData } = bankImage
    return `data:${contentType};base64, ${imageData}`
  }
  return ''
}

export const getBankName = (bankCode: string): string => {
  const { nameTh } = bankOptionsHashByBankCode[bankCode] || {}
  return nameTh || ''
}
