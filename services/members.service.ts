import axios, { AxiosResponse } from 'axios'
import { EndPointUrlConst } from '../constants'

export const memberProfile = (): Promise<AxiosResponse> =>
  axios.get(EndPointUrlConst.MEMBER.PROFILE)

console.log(EndPointUrlConst.MEMBER.PROFILE)
