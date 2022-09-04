import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  IShopAddCategoryPayload,
  IShopProductPayload,
  IShopUpdateCategoryPayload
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { ShopCategoryStatusEnum } from '~/enums'

export const getCategories = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.CATEGORIES, option)

export const getCategory = (
  categoryId: string,
  option?: AxiosRequestConfig
): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}`, option)

export const addCategotry = (payload?: IShopAddCategoryPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SHOPS.CATEGORIES, payload)

export const updateCategory = (
  categoryId: string,
  payload: IShopUpdateCategoryPayload
): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}`, payload)

export const deleteCategotry = (categoryId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}`)

export const changeCategoryStatus = (
  categoryId: string,
  status: ShopCategoryStatusEnum
): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.SHOPS.CATEGORIES}/${categoryId}/status`, { status })

export const getProducts = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.PRODUCTS, option)

export const addProduct = (payload: IShopProductPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SHOPS.PRODUCTS, payload)
