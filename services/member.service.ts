import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  ICreateAddress,
  IUpdateAddress,
  IMemberMobile,
  IMemberChangePassword
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getProfile = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBERS.PROFILE, option)

export const getAddresses = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBERS.ADDRESSES, option)

export const getAddress = (addressId: string, option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}`, option)

export const createAddress = (payload: ICreateAddress): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.MEMBERS.ADDRESSES, payload)

export const updateAddress = (addressId: string, payload: IUpdateAddress): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}`)

export const setMainAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}/set-main`)

export const changePassword = (payload: IMemberChangePassword): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.CHANGE_PASSWORD, payload)

export const updateMemberProfile = (memberId: string): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBERS.PROFILE}/${memberId}`)

export const updateEmail = (email: string): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBERS.EMAIL}/${email}`)

export const createMobile = (payload: IMemberMobile): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.MEMBERS.MOBILES_ADD, payload)

export const deleteMobile = (payload: IMemberMobile): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.MOBILES_DELETE, payload)

export const setMainMobile = (payload: IMemberMobile): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.MOBILES_SET_MAIN, payload)
