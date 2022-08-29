import axios, { Axios, AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ApiCodeEnum } from '~/enums'
import { IApiResponse } from '~/interfaces'

const createAxios = (): AxiosInstance => {
  const ax: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
    timeout: 30 * 1000, // 30s
    withCredentials: true
  })

  ax.interceptors.response.use(
    (response: AxiosResponse<IApiResponse>) => {
      const { data } = response || {}
      if (data.code === ApiCodeEnum.SUCCESS) {
        return response.data
      }
      return Promise.reject(response)
    },
    (error: AxiosError) => {
      console.log(error.response)
      return Promise.reject(error)
    }
  )

  return ax
}

export const AxiosService: Axios = createAxios()
