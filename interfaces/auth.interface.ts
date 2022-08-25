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

export interface IAuthLoginRes {
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
}

export interface IAuthToken {
  accessToken: string
  refreshToken: string
}
