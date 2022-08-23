export interface IMemberProfile {
  username: string
  firstName: string
  lastName: string
  mobile: string
  birthday?: string
  birthMonth?: string
  birthYear?: string
  gender?: string
  email: string
  code?: string
}

export interface IMemberProfileUpdate {
  firstName: string
  lastName: string
  birthday: string
  gender: string
}

export interface IMemberEmailUpdate {
  newEmail: string
  password: string
}

export interface IMemberMobile {
  mobile: string
  refCode: string
  otpCode: string
}
