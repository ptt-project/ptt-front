import axios, { Axios } from 'axios'
import { EndPointUrl } from '../constants'

const register = (payload: any): Promise<Axios> => axios.post(EndPointUrl.AUTH.REGISTER, payload)

const login = (payload: any): Promise<Axios> => axios.post(EndPointUrl.AUTH.LOGIN, payload)

export { login, register }
