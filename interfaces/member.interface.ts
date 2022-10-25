import { AccountGenderEnum } from '../enums'

export interface IMemberInfo {
  id: string
  username: string
  firstName: string
  lastName: string
  mobile: string
  birthday?: string
  gender?: AccountGenderEnum
  email: string
  imageId?: string
}

export interface IMemberMobile {
  id: string
  memberId: string
  mobile: string
  isPrimary: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface IUpdateMemberProfilePayload {
  firstName: string
  lastName: string
  birthday: string
  gender: string
  imageId?: string
}

export interface IUpdateMemberEmailPayload {
  newEmail: string
  password: string
}

export interface IUpdateMemberMobilePayload {
  mobile: string
  otpCode: string
  refCode: string
}

export interface IMemberChangePasswordPayload {
  oldPassword: string
  newPassword: string
}
