import { SellerApprovalStatusEnum, SellerShopTypeEnum } from '~/enums'

export interface ISellerRegisterService {
  type: SellerShopTypeEnum
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

export interface ISellerRegisterRes {
  type: SellerShopTypeEnum
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

  id: string
  memberId: string
  shopName?: string
  shopDescription?: string
  approvalStatus: SellerApprovalStatusEnum
  productCount: number
  replyRate: number
  shopScore: number
  scoreCount: number
  cancelRate: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
