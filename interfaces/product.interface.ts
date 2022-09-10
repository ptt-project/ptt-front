import { ProductConditionEnum, ProductStatusEnum } from '../enums'

export interface IProductDetailOption {
  name: string
  options: string[]
}

export interface IProductDetail {
  option1: string
  option2: string
  price: number
  stock: number
  sku?: string
}

export interface ICreateProductPayload {
  name: string
  detail: string
  platformCategoryId: number
  brandId?: number
  weight: number
  exp?: number
  condition?: ProductConditionEnum
  isSendLated?: boolean
  extraDay?: number
  videoLink?: string
  imageIds?: string[]
  width: number
  length: number
  height: number
  isMultipleOptions: boolean
  price?: number
  stock?: number
  sku?: string
  productOptions?: IProductDetailOption[]
  products?: IProductDetail[]
}

export interface IProduct {
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

export interface IProductProfile {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  name: string
  detail: string
  shopId: number
  platformCategoryId: number
  brandId?: number
  status: ProductStatusEnum
  approval: boolean
  weight: string
  width: number
  length: number
  height: number
  exp?: number
  condition?: ProductConditionEnum
  isSendLated?: boolean
  extraDay?: number
  videoLink?: string
  imageIds?: string[]
  watched: number
  like: number
}

export interface IProductOption {
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
