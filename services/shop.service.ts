import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  ICreateCategoryPayload,
  ICreateProductPayload,
  IUpdateCategoryPayload
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { CategoryStatusEnum } from '~/enums'

export const getCategories = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.CATEGORIES, option)

export const getCategory = (
  categoryId: string,
  option?: AxiosRequestConfig
): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}`, option)

export const createCategory = (payload?: ICreateCategoryPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SHOPS.CATEGORIES, payload)

export const updateCategory = (
  categoryId: string,
  payload: IUpdateCategoryPayload
): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}`, payload)

export const deleteCategotry = (categoryId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}`)

export const changeCategoryStatus = (
  categoryId: string,
  status: CategoryStatusEnum
): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}/status`, { status })

export const getProducts = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.PRODUCTS, option)

export const createProduct = (payload: ICreateProductPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SHOPS.PRODUCTS, payload)
