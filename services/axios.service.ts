import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IApiResponse } from '~/interfaces'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig: AxiosRequestConfig = { ...config }
  newConfig.timeout = 300000
  // newConfig.withCredentials = true
  return newConfig
})

axios.interceptors.response.use(
  (response: AxiosResponse<IApiResponse>) => response.data,
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export const AxiosService: Axios = axios
