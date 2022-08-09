import axios, { AxiosResponse } from 'axios'
import { IOtpRequestService } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const requestOtp = (payload: IOtpRequestService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.OTP.REQUEST, payload)
