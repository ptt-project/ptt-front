import { AxiosService } from './axios.service'
import {
  IApiResponse,
  IAuthLoginPayload,
  IAuthRegisterPayload,
  IAuthRegisterValidatePayload,
  IAuthResetPasswordByEmailPayload,
  IAuthResetPasswordByMobilePayload
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const registerValidate = (payload: IAuthRegisterValidatePayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.REGISTER_VALIDATE, payload)

export const register = (payload: IAuthRegisterPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.REGISTER, payload)

export const login = (payload: IAuthLoginPayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.LOGIN, payload)

export const requestResetPasswordByEmail = (email: string): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.REQUEST_RESET_PASSWORD_BY_EMAIL, { email })

export const resetPasswordByEmail = (
  payload: IAuthResetPasswordByEmailPayload
): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.RESET_PASSWORD_BY_EMAIL, payload)

export const resetPasswordByMobile = (
  payload: IAuthResetPasswordByMobilePayload
): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.AUTH.RESET_PASSWORD_BY_MOBILE, payload)
