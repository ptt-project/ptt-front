import { ISellerInfo } from '.'
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
  platformCategoryId: string
  brandId?: number
  weight?: number
  exp?: number
  condition: ProductConditionEnum
  isSendLated?: boolean
  extraDay?: number
  videoLink?: string
  imageIds?: string[]
  width?: number
  length?: number
  height?: number
  isMultipleOptions: boolean
  price?: number
  stock?: number
  sku?: string
  productOptions?: IProductDetailOption[]
  products?: IProductDetail[]
}

export type IUpdateProductPayload = ICreateProductPayload

export interface IProductOption {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  name: string
  productProfileId: string
  options?: string[]
}

export interface IProductItem {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  sku: string
  productProfileId: string
  option1?: string
  option2?: string
  price: number
  stock: number
  sold: number
  amountSold: number
}

export interface IProduct {
  id: string
  name: string
  detail: string
  shopId: string
  platformCategoryId: string
  brandId?: string
  status: ProductStatusEnum
  approval: boolean
  weight?: string
  width?: number
  length?: number
  height?: number
  exp?: number
  condition: ProductConditionEnum
  isSendLated?: boolean
  extraDay?: number
  videoLink?: string
  imageIds: string[]
  watched: number
  like: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  products: IProductItem[]
}

export interface IProductInfo {
  productOptions: IProductOption[]
  productProfile: Omit<IProduct, 'products'>
  products: IProduct['products']
}

export interface IShop extends ISellerInfo {
  products?: IProduct[]
}
