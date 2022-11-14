import { ShopApprovalStatusEnum, ShopTypeEnum } from '../enums/shop.enum'

export interface IShopRegisterPayload {
  type: ShopTypeEnum
  fullName: string
  mobile: string
  email: string
  corporateName?: string
  corporateId?: string
  brandName: string
  category: string
  website?: string
  facebookPage?: string
  instagram?: string
  socialMedia?: string
  mallApplicantRole?: string
  mallOfflineShopDetail?: string
  note?: string
}

export interface IShopInfo {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  type: ShopTypeEnum
  fullName: string
  mobile: string
  email: string
  brandName: string
  category: string
  website?: string
  facebookPage?: string
  instagram?: string
  socialMedia?: string
  corperateName?: string
  corperateId?: string
  approvalStatus: ShopApprovalStatusEnum
  shopName?: string
  shopDescription?: string
  productCount: number
  replyRate: string
  shopScore: string
  scoreCount: number
  cancelRate: string
  mallApplicantRole?: string
  mallOfflineShopDetail?: string
  note?: string
  profileImagePath?: string
  coverImagePath?: string
  memberId: string
}

export interface IShopUpdateInfoPayload {
  shopName?: string
  shopDescription?: string
  profileImagePath?: string
  coverImagePath?: string
}
