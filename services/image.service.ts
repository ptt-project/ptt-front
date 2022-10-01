// import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'

export const upload = (formData: FormData): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.IMAGES.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
