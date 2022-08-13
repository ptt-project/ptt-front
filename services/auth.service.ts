import { AxiosResponse } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  IAuthLoginService,
  IAuthRegisterService,
  IAuthRegisterValidateService
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const registerValidate = (
  payload: IAuthRegisterValidateService
): Promise<AxiosResponse<IApiResponse>> =>
  AxiosService.post(EndPointUrlConst.AUTH.REGISTER_VALIDATE, payload)

export const register = (payload: IAuthRegisterService): Promise<AxiosResponse<IApiResponse>> =>
  AxiosService.post(EndPointUrlConst.AUTH.REGISTER, payload)

export const login = (payload: IAuthLoginService): Promise<AxiosResponse<IApiResponse>> =>
  AxiosService.post(EndPointUrlConst.AUTH.LOGIN, payload)
