import { AxiosResponse } from 'axios'
import { AxiosService } from './axios.service'
import {
  IAddress,
  IApiResponse,
  IAxiosResponse,
  ICreateAddress,
  IUpdateAddress
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getProfile = (): Promise<AxiosResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBER.PROFILE)

export const getAddresses = (): Promise<IAxiosResponse<IAddress[]>> =>
  AxiosService.get(EndPointUrlConst.MEMBER.ADDRESSES)

export const getAddress = (addressId: string): Promise<IAxiosResponse<IAddress>> =>
  AxiosService.get(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const createAddress = (payload: ICreateAddress): Promise<IAxiosResponse<IAddress>> =>
  AxiosService.post(`${EndPointUrlConst.MEMBER.ADDRESSES}`, payload)

export const updateAddress = (
  addressId: string,
  payload: IUpdateAddress
): Promise<IAxiosResponse<IAddress>> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (addressId: string): Promise<IAxiosResponse<IAddress>> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const setMainAddress = (addressId: string): Promise<AxiosResponse<IApiResponse>> =>
  AxiosService.patch(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {})
