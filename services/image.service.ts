// import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { SizeImagesEnum } from '~/enums'

export const upload = (formData: FormData): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.IMAGES.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const get = (imageId: string, size: SizeImagesEnum): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.IMAGES.GET}/${imageId}/${size}`)
