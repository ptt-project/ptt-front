import { AxiosService } from './axios.service'
import { IApiResponse, ICreateAddress, IUpdateAddress } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getProfile = (): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBER.PROFILE)

export const getAddresses = (): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBER.ADDRESSES)

export const getAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const createAddress = (payload: ICreateAddress): Promise<IApiResponse> =>
  AxiosService.post(`${EndPointUrlConst.MEMBER.ADDRESSES}`, payload)

export const updateAddress = (addressId: string, payload: IUpdateAddress): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const setMainAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {})
