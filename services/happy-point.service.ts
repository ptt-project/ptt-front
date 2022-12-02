/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  IBuyHappyPointParams,
  IGetHappyPointBalanceResponse,
  IGetHappyPointHistoryParams,
  IHappyPoint,
  IHappyPointHistoryResponse,
  IInquiryHappyPointLookupResponse,
  ISellHappyPointParams,
  ITransferHappyPointParams
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const getHappyPointBalance = (): Promise<IApiResponse<IGetHappyPointBalanceResponse>> =>
  AxiosService.get(EndPointUrlConst.HAPPY_POINT.BALANCE)

export const postInquiryHappyPointRateLookup = (): Promise<
  IApiResponse<IInquiryHappyPointLookupResponse>
> => AxiosService.post(EndPointUrlConst.HAPPY_POINT.LOOKUP)

export const getHappyPointHistory = (
  params: IGetHappyPointHistoryParams
): Promise<IApiResponse<IHappyPointHistoryResponse>> =>
  AxiosService.get(EndPointUrlConst.HAPPY_POINT.HISTORY, {
    params
  })

export const postBuyHappyPoint = (
  payload: IBuyHappyPointParams
): Promise<IApiResponse<IHappyPoint>> =>
  AxiosService.post(EndPointUrlConst.HAPPY_POINT.BUY, payload)

export const postSellHappyPoint = (
  payload: ISellHappyPointParams
): Promise<IApiResponse<IHappyPoint>> =>
  AxiosService.post(EndPointUrlConst.HAPPY_POINT.SELL, payload)

export const postTransferHappyPoint = (
  payload: ITransferHappyPointParams
): Promise<IApiResponse<IHappyPoint>> =>
  AxiosService.post(EndPointUrlConst.HAPPY_POINT.TRANSFER, payload)

export const useGetHappyPointBalance = () => {
  return useQuery(
    [EndPointUrlConst.HAPPY_POINT.BALANCE],
    async () => {
      const { data } = await getHappyPointBalance()
      return data
    },
    {
      placeholderData: {
        balance: 0
      },
      cacheTime: 10 * 60 * 1000,
      staleTime: 1 * 60 * 1000
    }
  )
}

export const useGetHappyPointRateLookup = () => {
  return useQuery(
    [EndPointUrlConst.HAPPY_POINT.LOOKUP],
    async () => {
      const { data } = await postInquiryHappyPointRateLookup()
      return data
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 1000
    }
  )
}

export const useGetHappyPointHistory = (params: IGetHappyPointHistoryParams) => {
  return useQuery(
    [EndPointUrlConst.HAPPY_POINT.HISTORY, params],
    async () => {
      const { data } = await getHappyPointHistory(params)
      return data
    },
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 5 * 1000
    }
  )
}

export const useBuyHappyPoint = () => {
  const queryClient: QueryClient = useQueryClient()
  return useMutation(
    async (payload: IBuyHappyPointParams) => {
      const { data } = await postBuyHappyPoint(payload)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EndPointUrlConst.HAPPY_POINT.HISTORY])
        queryClient.invalidateQueries([EndPointUrlConst.HAPPY_POINT.BALANCE])
        queryClient.invalidateQueries([EndPointUrlConst.WALLET.WALLETS])
      }
    }
  )
}

export const useSellHappyPoint = () => {
  const queryClient: QueryClient = useQueryClient()
  return useMutation(
    async (payload: ISellHappyPointParams) => {
      const { data } = await postSellHappyPoint(payload)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EndPointUrlConst.HAPPY_POINT.HISTORY])
        queryClient.invalidateQueries([EndPointUrlConst.HAPPY_POINT.BALANCE])
        queryClient.invalidateQueries([EndPointUrlConst.WALLET.WALLETS])
      }
    }
  )
}

export const useTransferHappyPoint = () => {
  const queryClient: QueryClient = useQueryClient()
  return useMutation(
    async (payload: ITransferHappyPointParams) => {
      const { data } = await postTransferHappyPoint(payload)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EndPointUrlConst.HAPPY_POINT.HISTORY])
        queryClient.invalidateQueries([EndPointUrlConst.HAPPY_POINT.BALANCE])
        queryClient.invalidateQueries([EndPointUrlConst.WALLET.WALLETS])
      }
    }
  )
}
