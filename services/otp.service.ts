import { AxiosService } from './axios.service'
import { IApiResponse, IOtpRequestPayload } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const requestOtp = (payload: IOtpRequestPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.OTP.REQUEST, payload)
