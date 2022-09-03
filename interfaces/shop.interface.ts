import { ShopCategoryStatusEnum, ShopProductStatusEnum } from '~/enums'

export interface IShopAddCategoryPayload {
  name: string
}

export interface IShopUpdateCategoryPayload {
  name: string
  productIds: number[]
}

export interface IShopCategory {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  shopId: number
  name: string
  createdBy: string
  status: ShopCategoryStatusEnum
  productCount: number
  priority: number
}

export interface IShopProduct {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  sku?: string
  productProfileId: number
  option1?: string
  option2?: string
  price: string
  stock: number
}

export interface IShopProductProfile {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  name: string
  detail: string
  shopId: number
  platformCategoryId: number
  brandId?: number
  status: ShopProductStatusEnum
  approval: boolean
  weight: string
  width: number
  length: number
  height: number
  exp?: number
  condition?: string
  isSendLated?: boolean
  extraDay?: number
  videoLink?: string
  imageIds?: string[]
  watched: number
  like: number
}

export interface IShopProductOption {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  name: string
  productProfileId: number
  options?: string[]
}

export interface IProductData {
  key: string
  productName: string
  brand: string
  amount: number
  quantity: number
  sold: number
  status: number
}
