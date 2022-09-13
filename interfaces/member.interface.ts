export interface IMemberProfile {
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
}

export interface IMemberProfileUpdate {
  firstname: string
  lastname: string
  birthday: string
  gender: string
}

export interface IMemberEmailUpdate {
  newEmail: string
  password: string
}

export interface IMemberMobile {
  id: number
  mobile: string
  isPrimary: boolean
  deletedAt: string
}

export interface IMemberChangePassword {
  oldPassword: string
  newPassword: string
}
