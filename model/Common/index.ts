interface IBreadcrumbItem {
  title: string
  href?: string
}

interface IBreadcrumb {
  items?: IBreadcrumbItem[]
}

interface IOtpData {
  otp: string
  refCode: string
}

interface IFieldData {
  name: string | number | (string | number)[]
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

export type { IBreadcrumbItem, IBreadcrumb, IOtpData, IFieldData }
