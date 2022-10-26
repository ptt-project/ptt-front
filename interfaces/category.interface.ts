import { CategoryPlatformStatusEnum, CategoryStatusEnum } from '../enums'

export interface ICreateCategoryPayload {
  name: string
}

export interface IUpdateCategoryPayload {
  name: string
  productIds: number[]
}

export interface ICategory {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  shopId: string
  name: string
  createdBy: string
  status: CategoryStatusEnum
  productCount: number
  priority: number
}

export interface ICategoryPlatform {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  name: string
  status: CategoryPlatformStatusEnum
  productCount: number
}
