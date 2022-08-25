import { ShopCategoryStatusEnum } from '~/enums'

export interface IShopAddCategoryPayload {
  name: string
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

export interface IProductData {
  key: string
  productName: string
  brand: string
  amount: number
  quantity: number
  sold: number
  status: number
}
