import { AxiosResponse } from 'axios'

export interface IOption {
  label: string
  value: string | number
}

export interface IBreadcrumbItem {
  title: string
  href?: string
}

export interface IBreadcrumb {
  items?: IBreadcrumbItem[]
}

export interface IFieldData {
  name: string | number | (string | number)[]
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

export interface ICustomHookUseVisibleUtil {
  visible: boolean
  show: () => void
  hide: () => void
}

export interface IApiResponse<T = any> {
  message: string
  code: number
  data: T extends undefined ? never : T
}

export type IAxiosResponse<T = any> = AxiosResponse<IApiResponse<T>>
