import axios, { AxiosResponse } from 'axios'
import { EndPointUrlConst } from '../constants'

export const getProfile = (): Promise<AxiosResponse> =>
  axios.get(EndPointUrlConst.MEMBER.PROFILE)
