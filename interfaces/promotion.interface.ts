export interface IPromotion {
  id: number
  shopId: number
  name: string
  createdAt: Date
  updatedAt: Date
  startDate: Date
  endDate: Date
  deletedAt?: Date
}
export interface IPromotionPayload {
  name?: string
  startDate?: Date
  endDate?: Date
  status?: string
  page?: number
  limit?: number
}
