export interface IAuthRegisterForm {
  firstName: string
  lastName: string
  mobile: string
  email: string
  username: string
  password: string
}

export interface IAuthLoginForm {
  username: string
  password: string
}

export interface IAuthForgotPasswordForm {
  reference: string
}
