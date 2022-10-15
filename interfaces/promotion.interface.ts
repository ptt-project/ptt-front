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
