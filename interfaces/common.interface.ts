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

export interface IBaseEntity {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export interface IPaginationMeta {
  /**
   * the amount of items on this specific page
   */
  itemCount: number
  /**
   * the total amount of items
   */
  totalItems: number
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number
  /**
   * the current page this paginator "points" to
   */
  currentPage: number
}

export interface IPaginationResponse<T> {
  meta: IPaginationMeta
  items: T[]
}

export interface IApiResponse<T = any> {
  message: string
  code: number
  data: T extends undefined ? never : T
}

export type IAxiosResponse<T = any> = AxiosResponse<IApiResponse<T>>
