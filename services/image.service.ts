// import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import { IApiResponse } from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { EnumImageSize } from '~/enums/image.enum'
import { useQuery } from '@tanstack/react-query'

export const upload = (formData: FormData): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.IMAGES.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const getImage = (
  imageId: string,
  imageSize: EnumImageSize = EnumImageSize.MEDIUM
): Promise<IApiResponse<Blob>> =>
  AxiosService.get(`${EndPointUrlConst.IMAGES.IMAGE}/${imageId}/${imageSize}`, {
    responseType: 'blob'
  })

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGetImage = (imageId: string, imageSize: EnumImageSize = EnumImageSize.SMALL) => {
  return useQuery(
    [EndPointUrlConst.IMAGES.IMAGE, imageId, imageSize],
    async () => {
      const { data } = await getImage(imageId, imageSize)
      return data
    },
    {
      enabled: !!imageId,
      cacheTime: Infinity,
      staleTime: 60 * 60 * 1000
    }
  )
}
