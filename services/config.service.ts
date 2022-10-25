/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosService } from './axios.service'
import { IApiResponse, IConfigOptionsResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { useQuery } from '@tanstack/react-query'

export const getConfigOptions = (): Promise<IApiResponse<IConfigOptionsResponse>> =>
  AxiosService.get(EndPointUrlConst.CONFIG.OPTIONS)

export const useGetConfigOptions = () => {
  return useQuery(
    [EndPointUrlConst.CONFIG.OPTIONS],
    async () => {
      const { data } = await getConfigOptions()
      return data
    },
    {
      cacheTime: Infinity,
      staleTime: 5 * 60 * 1000,
      meta: {
        persist: true
      },
      suspense: true,
      useErrorBoundary: false
    }
  )
}
