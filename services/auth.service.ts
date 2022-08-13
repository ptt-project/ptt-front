import axios, { AxiosResponse } from 'axios'
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
  axios.post(EndPointUrlConst.AUTH.REGISTER_VALIDATE, payload)

export const register = (payload: IAuthRegisterService): Promise<AxiosResponse<IApiResponse>> =>
  axios.post(EndPointUrlConst.AUTH.REGISTER, payload)

export const login = (payload: IAuthLoginService): Promise<AxiosResponse<IApiResponse>> =>
  axios.post(EndPointUrlConst.AUTH.LOGIN, payload)
