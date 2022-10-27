/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IAddBankAccountParams,
  IAddBankAccountResponse,
  IApiResponse,
  IBankAccount,
  IDeleteBankAccountParams,
  IEditBankAccountParams,
  IGetBankAccountOptionsResponse,
  IGetBankAccountsParams,
  IGetBankAccountsResponse
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { useQuery } from '@tanstack/react-query'

export const getBankAccounts = (
  payload: IGetBankAccountsParams,
  option?: AxiosRequestConfig
): Promise<IApiResponse<IGetBankAccountsResponse>> =>
  AxiosService.get(EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS, {
    ...option,
    params: payload
  })

export const getBankAccount = (
  bankAccountId: string,
  option?: AxiosRequestConfig
): Promise<IBankAccount> =>
  AxiosService.get<IGetBankAccountsResponse>(
    `${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}`,
    option
  ).then((response) => response.data.find((e) => e.id === bankAccountId))

export const getBankAccountOptions = (
  option?: AxiosRequestConfig
): Promise<IApiResponse<IGetBankAccountOptionsResponse>> =>
  AxiosService.get(`${EndPointUrlConst.BANK_ACCOUNT.OPTIONS}`, option)

export const addBankAccount = (
  payload: IAddBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.post(EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS, payload)

export const editBankAccount = (
  bankAccountId: string,
  payload: IEditBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.put(`${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}/${bankAccountId}`, payload)

export const deleteBankAccount = (
  bankAccountId: string,
  payload: IDeleteBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.patch(
    `${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}/${bankAccountId}/delete`,
    payload
  )

export const setMainBankAccount = (
  bankAccountId: string
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.patch(`${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}/${bankAccountId}/set-main`)

export const useGetBankAccounts = (payload: IGetBankAccountsParams) => {
  return useQuery(
    [EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS],
    async () => {
      const { data } = await getBankAccounts(payload)
      return data
    },
    {
      enabled: !!payload.otpCode && !!payload.refCode,
      cacheTime: 5 * 60 * 1000,
      staleTime: 1 * 60 * 1000
    }
  )
}
