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

export const getProfile = (): Promise<AxiosResponse> => axios.get(EndPointUrlConst.MEMBER.PROFILE)

export const getAddresses = (): Promise<IAxiosResponse<IAddress[]>> =>
  axios.get(EndPointUrlConst.MEMBER.ADDRESSES)

export const getAddress = (
  req: NextIncomingMessage,
  addressId: string
): Promise<IAxiosResponse<IAddress>> =>
  axios.get(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

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
  axios.delete(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const setMainAddress = (
  req: NextIncomingMessage,
  addressId: string
): Promise<AxiosResponse<IApiResponse>> =>
  axios.patch(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {})
