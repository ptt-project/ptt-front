/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
import { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'
import { AxiosService } from './axios.service'
import {
  IAddBankAccountParams,
  IAddBankAccountResponse,
  IApiResponse,
  IGetBankAccountsResponse
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getBankAccounts = (
  option?: AxiosRequestConfig
): Promise<IApiResponse<IGetBankAccountsResponse>> =>
  AxiosService.get(EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS, option)

export const addBankAccount = (
  payload: IAddBankAccountParams
): Promise<IApiResponse<IAddBankAccountResponse>> =>
  AxiosService.post(EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS, payload)

export const useGetBankAccounts = (option?: AxiosRequestConfig) =>
  useSWR([EndPointUrlConst.BANK_ACCOUNT.BANK_ACCOUNTS], async () => {
    const response = await getBankAccounts(option)
    return response.data
  })
