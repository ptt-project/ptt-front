import { CategoryStatusEnum } from '../enums'

export interface ICreateCategoryPayload {
  name: string
}

export interface IUpdateCategoryPayload {
  name: string
  productIds: number[]
}

export interface ICategory {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  shopId: number
  name: string
  createdBy: string
  status: CategoryStatusEnum
  productCount: number
  priority: number
}
