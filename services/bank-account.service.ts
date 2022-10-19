/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
import { AxiosRequestConfig } from 'axios'
import { useQuery } from '@tanstack/react-query'
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
  ).then((response) => response.data.find((e) => e.id === Number(bankAccountId)))

export const getBankAccountOptions = (
  option?: AxiosRequestConfig
): Promise<IApiResponse<IGetBankAccountOptionsResponse>> =>
  AxiosService.get(`${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNT_OPTIONS}`, option)

export const addBankAccount = (
  payload: IAddBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.post(EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS, payload)

export const editBankAccount = (
  bankAccountId: number,
  payload: IEditBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.put(`${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}/${bankAccountId}`, payload)

export const deleteBankAccount = (
  bankAccountId: number,
  payload: IDeleteBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.patch(
    `${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}/${bankAccountId}/delete`,
    payload
  )

export const setMainBankAccount = (
  bankAccountId: number
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.patch(`${EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS}/${bankAccountId}/set-main`)

export const useGetBankAccounts = (option?: AxiosRequestConfig) =>
  useQuery([EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS], async () => {
    const response = await getBankAccounts({ otpCode: '', refCode: '' }, option)
    return response.data
  })
