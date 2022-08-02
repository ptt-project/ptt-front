import axios, { Axios } from 'axios'
import { EndPointUrlConst } from '../constants'

const register = (payload: any): Promise<Axios> =>
  axios.post(EndPointUrlConst.AUTH.REGISTER, payload)

const login = (payload: any): Promise<Axios> => axios.post(EndPointUrlConst.AUTH.LOGIN, payload)

export { login, register }
