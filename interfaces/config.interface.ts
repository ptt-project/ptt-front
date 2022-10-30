import { AddressFieldsEnum, ConfigOptionPlatformCategoryStatusEnum } from '~/enums'

export interface IConfigOptionBrand {
  id: string
}

export interface IConfigOptionPlatformCategory {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  name: string
  status: ConfigOptionPlatformCategoryStatusEnum
  productCount: number
}

export interface IConfigOptionBank {
  id: string
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
