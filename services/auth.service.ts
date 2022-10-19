import { AxiosService } from './axios.service'
import {
  IApiResponse,
  IAuthLoginPayload,
  IAuthRegisterPayload,
  IAuthRegisterValidatePayload,
  IAuthResetPasswordPayload
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const registerValidate = (payload: IAuthRegisterValidatePayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.REGISTER_VALIDATE, payload)

export const register = (payload: IAuthRegisterPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.REGISTER, payload)

export const login = (payload: IAuthLoginPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.LOGIN, payload)

export const resetPassword = (payload: IAuthResetPasswordPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.RESET_PASSWORD, payload)
