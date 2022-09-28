/* eslint-disable no-unexpected-multiline */
import React, { FC, MutableRefObject, useEffect, useState } from 'react'
import { Magnifier } from 'react-image-magnifiers'
import { Image, Typography } from 'antd'
import OwlCarousel from '~/components/main/OwlCarousel'
import ProductThumb from '../ProductThumb'
import styles from './ProductGallery.module.scss'

const { Text } = Typography

const images: string[] = [
  'https://dummyimage.com/800x800?text=Product 1 800 x 800',
  'https://dummyimage.com/800x800?text=Product 2 800 x 800',
  'https://dummyimage.com/800x800?text=Product 3 800 x 800',
  'https://dummyimage.com/800x800?text=Product 4 800 x 800',
  'https://dummyimage.com/800x800?text=Product 5 800 x 800'
]

const ProductGallery: FC = () => {
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [imageRef, setImageRef] = useState<MutableRefObject<any>>(null)
  const [visible, setVisible] = useState<boolean>(false)

  const events: any = {
    onTranslate: (e: any) => {
      if (!e.target) return
      if (document.querySelector('.product-thumbs')) {
        document
          .querySelector('.product-thumbs')
          .querySelector('.product-thumb.active')
          .classList.remove('active')
        document
          .querySelector('.product-thumbs')
          .querySelectorAll('.product-thumb')
          [e.item.index].classList.add('active')
      }
    }
  }

  function setIndexHandler(index: number): void {
    if (imageIndex !== index) {
      setImageIndex(index)
    }
  }

  function changeRefHandler(ref: MutableRefObject<any>): void {
    if (ref?.current) {
      setImageRef(ref)
    }
  }

  useEffect(() => {
    if (imageRef?.current && imageIndex >= 0) {
      imageRef.current.$car.to(imageIndex, 300, true)
    }
  }, [imageIndex])

  return (
    <div
      className={`${styles.gallery} product-gallery product-gallery-vertical product-gallery-sticky`}
    >
      <OwlCarousel
        className="product-single-carousel owl-theme owl-nav-inner"
        options={{
          autoHeight: false,
          dots: false,
          nav: true
        }}
        onChangeIndex={setIndexHandler}
        onChangeRef={changeRefHandler}
        events={events}
      >
        {images.map((src: string, index: number) => (
          <div key={index}>
            <Magnifier
              imageSrc={src}
              imageAlt="magnifier"
              largeImageSrc={src}
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              className="product-image large-image"
            />
          </div>
        ))}
      </OwlCarousel>

      <Text className={`${styles.zoom} product-image-full`} onClick={(): void => setVisible(true)}>
        <i className="d-icon-zoom" />
      </Text>

      <ProductThumb images={images} index={imageIndex} onChangeIndex={setIndexHandler} />

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis: boolean) => setVisible(vis) }}
        >
          {images.map((src: string, index: number) => (
            <Image key={index} src={src} />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  )
}

export default ProductGallery
