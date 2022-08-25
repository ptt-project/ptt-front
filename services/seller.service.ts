import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse, ISellerRegisterPayload } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const register = (payload: ISellerRegisterPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SELLER.REGISTER, payload)

export const shopInfo = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SELLER.SHOP_INFO, option)
