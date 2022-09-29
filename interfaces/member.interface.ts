export interface IMemberProfilePayload {
  username: string
  firstName: string
  lastName: string
  mobile: string
  birthday?: string
  day?: string
  month?: string
  year?: string
  gender?: string
  email: string
  code?: string
  imageId?: string
  image?: any
}

export interface IMemberProfileUpdatePayload {
  firstName: string
  lastName: string
  birthday: string
  gender: string
  imageId: string
}

export interface IMemberEmailUpdatePayload {
  newEmail: string
  password: string
}

export interface IMemberMobile {
  [x: string]: any
  id: number
  mobile: string
  isPrimary: boolean
  deletedAt: string
}

export interface IMemberMobilePayload {
  mobile: string
  otpCode: string
  refCode: string
}

export interface IMemberChangePassword {
  oldPassword: string
  newPassword: string
}
