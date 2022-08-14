import axios from 'axios'
import { IApiResponse, IOtpRequestService } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const requestOtp = (payload: IOtpRequestService): Promise<IApiResponse> =>
  axios.post(EndPointUrlConst.OTP.REQUEST, payload)
