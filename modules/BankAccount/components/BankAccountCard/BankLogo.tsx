/* eslint-disable @typescript-eslint/typedef */
import { Image } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useGetImage } from '~/services/image.service'
import { blobToFile } from '~/utils/main'

interface IBankLogoProps {
  bankIconImageId: string
}
const BankLogo: FC<IBankLogoProps> = (props: IBankLogoProps) => {
  const { bankIconImageId: bankImageId } = props
  const [isImageError, setIsImageError] = useState<boolean>(false)
  const [image, setImage] = useState<string>()

  const { data: imageBlob } = useGetImage(bankImageId)

  useEffect(() => {
    const parseBlobToFile = async (): Promise<void> => {
      try {
        if (imageBlob) {
          const file = await blobToFile(imageBlob, `${bankImageId}.${imageBlob.type}`)
          const tempCreateObjectURL = URL.createObjectURL(file)
          setImage(tempCreateObjectURL)
        }
      } catch (error) {
        console.error(error)
      }
    }

    parseBlobToFile()
  }, [imageBlob])

  return !isImageError && image ? (
    <Image
      preview={false}
      src={image}
      alt={'bank-logo'}
      onError={(): void => {
        setIsImageError(true)
      }}
    />
  ) : (
    <Image
      preview={false}
      src="./images/main/buyer/bank-logo/default-bank-logo.png"
      alt="default-bank-logo"
    />
  )
}

export default BankLogo
