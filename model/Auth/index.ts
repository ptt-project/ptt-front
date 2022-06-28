interface IRegisterForm {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

interface ILoginForm {
  username: string
  password: string
}

interface IForgotPasswordForm {
  emailOrMobileNo: string
}

export type { IRegisterForm, ILoginForm, IForgotPasswordForm }
