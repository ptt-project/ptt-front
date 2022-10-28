import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse, ISellerRegisterPayload, ISellerUpdateInfoPayload } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const register = (payload: ISellerRegisterPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SELLERS.REGISTER, payload)

export const shopInfo = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SELLERS.SHOP_INFO, option)

export const updateShopInfo = (payload: ISellerUpdateInfoPayload): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.SELLERS.SHOP_INFO, payload)

export const shopRecommended = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.RECOMMENDED, option)
