import { AxiosService } from './axios.service'
import { IApiResponse, ISellerRegisterService } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const register = (payload: ISellerRegisterService): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.SELLER.REGISTER, payload)
