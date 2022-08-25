import { ShopCategoryStatusEnum } from '~/enums'

export interface IShopAddCategoryPayload {
  name: string
}

export interface IShopCategory {
  id: string
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
