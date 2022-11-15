import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  ICreateCategoryPayload,
  ICreateProductPayload,
  IShopRegisterPayload,
  IShopUpdateInfoPayload,
  IUpdateCategoryPayload,
  IUpdateProductPayload
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { CategoryStatusEnum } from '~/enums'

export const register = (payload: IShopRegisterPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SELLERS.REGISTER, payload)

export const getInfo = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.INFO, option)

export const updateInfo = (payload: IShopUpdateInfoPayload): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.SHOPS.INFO, payload)

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

export const getProduct = (productId: string, option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.SHOPS.PRODUCTS_PROFILE}/${productId}`, option)

export const createProduct = (payload: ICreateProductPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SHOPS.PRODUCTS, payload)

export const updateProduct = (
  productId: string,
  payload: IUpdateProductPayload
): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.SHOPS.PRODUCTS_PROFILE}/${productId}`, payload)

export const deleteProduct = (
  productId: string,
  option?: AxiosRequestConfig
): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.SHOPS.PRODUCTS_PROFILE}/${productId}`, option)

export const toggleProductStatus = (productId: string): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.SHOPS.PRODUCTS_PROFILE}/${productId}/hidden/toggle`)
