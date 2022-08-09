import axios, { AxiosResponse } from 'axios'
import { IAuthLoginService, IAuthRegisterService, IAuthRegisterValidateService } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const registerValidate = (payload: IAuthRegisterValidateService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.AUTH.REGISTER_VALIDATE, payload)

export const register = (payload: IAuthRegisterService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.AUTH.REGISTER, payload)

export const login = (payload: IAuthLoginService): Promise<AxiosResponse> =>
  axios.post(EndPointUrlConst.AUTH.LOGIN, payload)
