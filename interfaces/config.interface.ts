import { AddressFieldsEnum } from '~/enums'

export interface IOptionBrand {
  id: string
}

export interface IOptionPlatformCategory {
  id: string
}

export interface IOptionBank {
  id: string
}

export interface IOptionAddress {
  [AddressFieldsEnum.SUB_DISTRICT]: string
  [AddressFieldsEnum.DISTRICT]: string
  [AddressFieldsEnum.PROVINCE]: string
  [AddressFieldsEnum.POSTCODE]: number
}

export interface IConfigOptionsResponse {
  brand: IOptionBrand[]
  platformCategory: IOptionPlatformCategory[]
  bank: IOptionBank[]
  address: IOptionAddress[]
}
