import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const get = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.PRODUCTS, option)
