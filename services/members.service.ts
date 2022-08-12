import axios, { AxiosResponse } from 'axios'
import { NextIncomingMessage } from 'next/dist/server/request-meta'
import { EndPointUrlConst } from '../constants'

export const memberProfile = (req: NextIncomingMessage): Promise<AxiosResponse> =>
  axios.get(EndPointUrlConst.MEMBER.PROFILE, { headers: { Cookie: req.headers.cookie } })