import { AxiosService } from './axios.service'
import {
  IAddress,
  IApiResponse,
  ICreateAddress,
  IUpdateAddress,
  IMemberProfileUpdate,
  IMemberEmailUpdate,
  IMemberMobile
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getProfile = (): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBER.PROFILE)

export const getAddresses = (): Promise<IApiResponse<IAddress[]>> =>
  AxiosService.get(EndPointUrlConst.MEMBER.ADDRESSES)

export const getAddress = (addressId: string, headers?: any): Promise<IApiResponse<IAddress>> =>
  AxiosService.get(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {
    headers: { ...headers }
  })

export const createAddress = (payload: ICreateAddress): Promise<IApiResponse> =>
  AxiosService.post(`${EndPointUrlConst.MEMBER.ADDRESSES}`, payload, { withCredentials: true })

export const updateAddress = (addressId: string, payload: IUpdateAddress): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const setMainAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}/set-main`)

export const updateMemberProfile = (payload: IMemberProfileUpdate): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.PROFILE}`, payload)

export const updateEmail = (payload: IMemberEmailUpdate): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.EMAIL}`, payload)

export const createMobile = (payload: IMemberMobile): Promise<IApiResponse> =>
  AxiosService.post(`${EndPointUrlConst.MEMBER.MOBILES}`, payload)

export const deleteMobile = (payload: IMemberMobile): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBER.MOBILES}`)
