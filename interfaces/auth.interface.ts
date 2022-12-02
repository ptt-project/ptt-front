import { ShopApprovalStatusEnum } from '~/enums'

export interface IAuthRegisterForm {
  firstName: string
  lastName: string
  mobile: string
  email: string
  username: string
  password: string
}

export interface IAuthForgotPasswordForm {
  reference: string
}

export interface IAuthRegisterValidatePayload {
  email: string
  username: string
  mobile: string
}

export interface IAuthRegisterPayload {
  firstName: string
  lastName: string
  mobile: string
  email: string
  username: string
  password: string
  pdpaStatus: boolean
  otpCode: string
  refCode: string
}

export interface IAuthLoginPayload {
  username: string
  password: string
}

export interface IAuthLogin {
  accessToken: string
  refreshToken: string
  username: string
  firstName: string
  lastName: string
  mobile: string
  email: string
}

export interface IAuthUserInfo {
  username: string
  firstName: string
  lastName: string
  mobile: string
  email: string
  approvalStatus?: ShopApprovalStatusEnum
}

export interface IAuthToken {
  accessToken: string
  refreshToken: string
}

export interface IAuthResetPasswordByEmailPayload {
  email: string
  password: string
  loginToken: string
}

export interface IAuthResetPasswordByMobilePayload {
  mobile: string
  password: string
  otpCode: string
  refCode: string
}
