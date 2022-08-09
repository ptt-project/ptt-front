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

export interface IAuthRegisterValidateService {
  email: string
  username: string
}

export interface IAuthRegisterService {
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

export interface IAuthLoginService {
  username: string
  password: string
}

export interface IAuthLoginRes {
  accessToken: string
  refreshToken: string
  username: string
  firstname: string
  lastname: string
  mobile: string
  email: string
}

export interface IAuthUserInfo {
  username: string
  firstname: string
  lastname: string
  mobile: string
  email: string
}
