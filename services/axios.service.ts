import axios, { Axios, AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { pick } from 'lodash'
import { ApiCodeEnum } from '~/enums'
import { IApiResponse } from '~/interfaces'

const createAxios = (): AxiosInstance => {
  const ax: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
    timeout: 30 * 1000,
    withCredentials: true
  })

  ax.interceptors.response.use(
    (response: AxiosResponse<IApiResponse>) => {
      const { data, config } = response || {}
      const request: any = pick(config, ['method', 'url', 'params', 'headers'])
      console.log({ request })
      if (data.code === ApiCodeEnum.SUCCESS) return response.data
      return Promise.reject(response)
    },
    (error: AxiosError) => {
      const { config } = error
      const request: any = pick(config, ['method', 'url', 'params', 'headers'])
      const error2: any = pick(error, ['message', 'stack', 'cause', 'code', 'status'])
      if (!request || !error2) {
        console.log({ error })
      } else {
        console.log(
          JSON.stringify(
            {
              request,
              error2
            },
            null,
            2
          )
        )
      }
      return Promise.reject(error)
    }
  )

  return ax
}

export const AxiosService: Axios = createAxios()
