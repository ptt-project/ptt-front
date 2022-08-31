import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { IShopAddCategoryPayload, IShopUpdateCategoryPayload } from '~/interfaces/shop.interface'
import { ShopCategoryStatusEnum } from '~/enums'

export const getCategories = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOP.CATEGORIES, option)

export const getCategory = (
  categoryId: string,
  option?: AxiosRequestConfig
): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.SHOP.CATEGORIES}/${categoryId}`, option)

export const addCategotry = (payload?: IShopAddCategoryPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SHOP.CATEGORIES, payload)

export const updateCategory = (
  categoryId: string,
  payload: IShopUpdateCategoryPayload
): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.SHOP.CATEGORIES}/${categoryId}`, payload)

export const deleteCategotry = (categoryId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.SHOP.CATEGORIES}/${categoryId}`)

export const changeCategoryStatus = (
  categoryId: string,
  status: ShopCategoryStatusEnum
): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.SHOP.CATEGORIES}/${categoryId}/status`, { status })
