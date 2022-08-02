export interface IAuthRegisterForm {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

export interface IAuthLoginForm {
  username: string
  password: string
}

export interface IAuthForgotPasswordForm {
  emailOrMobileNo: string
}
