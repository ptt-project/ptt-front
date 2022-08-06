import axios, { AxiosResponse } from 'axios'
import {
  IAuthRegisterService,
  IAuthRegisterValidateService,
  IAuthRequestOtpService
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const registerValidate = (payload: IAuthRegisterValidateService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.AUTH.REGISTER_VALIDATE, payload)

export const register = (payload: IAuthRegisterService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.AUTH.REGISTER, payload)

export const requestOtp = (payload: IAuthRequestOtpService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.AUTH.REQUEST_OTP, payload)
