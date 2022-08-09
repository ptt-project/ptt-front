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
