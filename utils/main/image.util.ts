import { ImageSizeEnum } from '../../enums'

export const ImageUrlUtil = (imageId: string, size: ImageSizeEnum): string => {
  if (imageId) {
    try {
      return `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/images/${imageId}/${size}`
    } catch (error) {
      console.log(error)
    }
  }

  return 'https://dummyimage.com/800x600/eee/000&text=Error'
}
