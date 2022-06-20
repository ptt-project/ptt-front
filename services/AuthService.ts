import axios, { Axios } from 'axios'
import { EndPoint } from '../constants'

const register = (payload: any): Promise<Axios> => axios.post(EndPoint.AUTH.REGISTER, payload)

const login = (payload: any): Promise<Axios> => axios.post(EndPoint.AUTH.LOGIN, payload)

export { login, register }
