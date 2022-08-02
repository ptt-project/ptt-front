export interface IBreadcrumbItem {
  title: string
  href?: string
}

export interface IBreadcrumb {
  items?: IBreadcrumbItem[]
}

export interface IOtpData {
  otp: string
  refCode: string
}

export interface IFieldData {
  name: string | number | (string | number)[]
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}
