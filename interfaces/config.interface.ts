import { AddressFieldsEnum } from '~/enums'

export interface IConfigOptionBrand {
  value: string
  labelTh: string
  labelEn: string
}

export interface IConfigOptionPlatformCategory {
  value: string
  labelTh: string
  labelEn: string
}

export interface IConfigOptionBank {
  value: string
  labelTh: string
  labelEn: string
  icon: string
}

export interface IOptionAddress {
  [AddressFieldsEnum.SUB_DISTRICT]: string
  [AddressFieldsEnum.DISTRICT]: string
  [AddressFieldsEnum.PROVINCE]: string
  [AddressFieldsEnum.POSTCODE]: number
}

export interface IConfigOptionsResponse {
  brand: IConfigOptionBrand[]
  platformCategory: IConfigOptionPlatformCategory[]
  bank: IConfigOptionBank[]
  address: IOptionAddress[]
}
