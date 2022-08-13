import axios, { AxiosResponse } from 'axios'
import { NextIncomingMessage } from 'next/dist/server/request-meta'
import {
  IAddress,
  IApiResponse,
  IAxiosResponse,
  ICreateAddress,
  IUpdateAddress
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const memberProfile = (req: NextIncomingMessage): Promise<AxiosResponse> =>
  axios.get(EndPointUrlConst.MEMBER.PROFILE, { headers: { Cookie: req.headers.cookie } })

export const getAddresses = (req: NextIncomingMessage): Promise<IAxiosResponse<IAddress[]>> =>
  axios.get(EndPointUrlConst.MEMBER.ADDRESSES, { headers: { Cookie: req.headers.cookie } })

export const getAddress = (
  req: NextIncomingMessage,
  addressId: string
): Promise<IAxiosResponse<IAddress>> =>
  axios.get(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {
    headers: { Cookie: req.headers.cookie }
  })

export const createAddress = (payload: ICreateAddress): Promise<IAxiosResponse<IAddress>> =>
  axios.post(`${EndPointUrlConst.MEMBER.ADDRESSES}`, payload)

export const updateAddress = (
  addressId: string,
  payload: IUpdateAddress
): Promise<IAxiosResponse<IAddress>> =>
  axios.put(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (
  req: NextIncomingMessage,
  addressId: string
): Promise<IAxiosResponse<IAddress>> =>
  axios.delete(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {
    headers: { Cookie: req.headers.cookie }
  })

export const setMainAddress = (
  req: NextIncomingMessage,
  addressId: string
): Promise<AxiosResponse<IApiResponse>> =>
  axios.patch(
    `${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`,
    {},
    { headers: { Cookie: req.headers.cookie } }
  )
