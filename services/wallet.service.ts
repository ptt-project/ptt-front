/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
import { AxiosRequestConfig } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  IGetWalletHistoryParams,
  IPaginationResponse,
  IWallet,
  IWalletDepositQrCodeParams,
  IWalletDepositQrCodeResponse,
  IWalletTransaction,
  IWalletWithdrawParams,
  IWalletWithdrawResponse
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const getMyWallet = (option?: AxiosRequestConfig): Promise<IApiResponse<IWallet>> =>
  AxiosService.get(EndPointUrlConst.WALLET.WALLETS, option)

export const getWalletHistory = (
  params: IGetWalletHistoryParams,
  option?: AxiosRequestConfig
): Promise<IApiResponse<IPaginationResponse<IWalletTransaction>>> =>
  AxiosService.get(EndPointUrlConst.WALLET.HISTORY, { ...option, params })

export const postWalletDepositQrCode = (
  payload: IWalletDepositQrCodeParams
): Promise<IApiResponse<IWalletDepositQrCodeResponse>> =>
  AxiosService.post(EndPointUrlConst.WALLET.DEPOSIT_QR_CODE, payload)

export const postWalletWithdraw = (
  payload: IWalletWithdrawParams
): Promise<IApiResponse<IWalletWithdrawResponse>> =>
  AxiosService.post(EndPointUrlConst.WALLET.WITHDRAW, payload)

export const useGetWalletHistory = (params: IGetWalletHistoryParams, option?: AxiosRequestConfig) =>
  useQuery([EndPointUrlConst.WALLET.WALLETS, EndPointUrlConst.WALLET.HISTORY, params], async () => {
    const response = await getWalletHistory(params, option)
    return response.data
  })

export const useGetMyWallet = (option?: AxiosRequestConfig) =>
  useQuery([EndPointUrlConst.WALLET.WALLETS], async () => {
    const response = await getMyWallet(option)
    return response.data
  })

export const useGetWalletDepositQrCode = (params: IWalletDepositQrCodeParams) => {
  return useQuery(
    [EndPointUrlConst.WALLET.DEPOSIT_QR_CODE, params],
    async () => {
      const { data } = await postWalletDepositQrCode(params)
      return data
    },
    {
      enabled: !!params.amount,
      retry: 0
    }
  )
}
