import { AxiosService } from './axios.service'
import { AxiosRequestConfig } from 'axios'
import { IApiResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'
export const getPromotions = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.SHOPS.PROMOTIONS, option)
