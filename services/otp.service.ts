import { AxiosService } from './axios.service'
import { IApiResponse, IOtpRequestService } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const requestOtp = (payload: IOtpRequestService): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.OTP.REQUEST, payload)
