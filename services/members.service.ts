import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  ICreateAddress,
  IUpdateAddress,
  IMemberMobile,
  IAddress,
  IMemberChangePassword
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getProfile = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBER.PROFILE, option)

export const getAddresses = (headers?: any): Promise<IApiResponse<IAddress[]>> =>
  AxiosService.get(EndPointUrlConst.MEMBER.ADDRESSES, {
    headers: { ...headers }
  })

export const getAddress = (addressId: string, headers?: any): Promise<IApiResponse<IAddress>> =>
  AxiosService.get(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, {
    headers: { ...headers }
  })

export const createAddress = (payload: ICreateAddress): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.MEMBER.ADDRESSES, payload)

export const updateAddress = (addressId: string, payload: IUpdateAddress): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}`)

export const setMainAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.MEMBER.ADDRESSES}/${addressId}/set-main`)

export const changePassword = (payload: IMemberChangePassword): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBER.CHANGE_PASSWORD, payload)

export const updateMemberProfile = (memberId: string): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.PROFILE}/${memberId}`)

export const updateEmail = (email: string): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBER.EMAIL}/${email}`)

export const createMobile = (payload: IMemberMobile): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.MEMBER.MOBILES, payload)

export const deleteMobile = (mobile: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBER.MOBILES}/${mobile}`)
