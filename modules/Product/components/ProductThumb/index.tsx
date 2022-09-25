/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-unused-expressions */
import React, { FC, MouseEvent, MutableRefObject, useEffect, useState } from 'react'
import OwlCarousel from '~/components/main/OwlCarousel'

interface IProductThumb {
  images: string[]
  index?: number
  onChangeIndex: (index: number) => void
}

const ProductThumb: FC<IProductThumb> = (props: IProductThumb) => {
  const [thumbRef, setThumbRef] = useState<MutableRefObject<any>>(null)

  useEffect(() => {
    if (thumbRef?.current && props.index >= 0) {
      thumbRef.current.$car.to(props.index, 300, true)

      if (document.querySelector('.product-thumbs')) {
        document
          .querySelector('.product-thumbs .owl-stage')
          .querySelector('.product-thumb.active') &&
          document
            .querySelector('.product-thumbs .owl-stage')
            .querySelector('.product-thumb.active')
            .classList.remove('active')
        document.querySelector('.product-thumbs .owl-stage').querySelectorAll('.owl-item')[
          props.index
        ] &&
          document.querySelector('.product-thumbs .owl-stage').querySelectorAll('.owl-item')[
            props.index
          ] &&
          document
            .querySelector('.product-thumbs .owl-stage')
            .querySelectorAll('.owl-item')
            [props.index].querySelector('.product-thumb')
            .classList.add('active')
      }
    }
  }, [props.index])

  function thumbActiveHandler(e: MouseEvent<HTMLDivElement>, thumbIndex: number): void {
    props.onChangeIndex(thumbIndex)

    if (document.querySelector('.product-thumbs')) {
      document
        .querySelector('.product-thumbs .owl-stage')
        .querySelector('.product-thumb.active')
        .classList.remove('active')
      e.currentTarget.classList.add('active')
    }
  }

  function changeRefHandler(ref: MutableRefObject<any>): void {
    if (ref?.current) {
      setThumbRef(ref)
    }
  }

  return (
    <div className="product-thumbs-wrap product-thumbs-two">
      <OwlCarousel
        className="product-thumbs product-thumb-carousel"
        options={{
          items: 4,
          nav: true,
          autoHeight: false
        }}
        onChangeRef={changeRefHandler}
      >
        {props.images.map((src: string, index: number) => (
          <div
            key={index}
            className={`product-thumb ${index === 0 ? 'active' : ''}`}
            onClick={(e: MouseEvent<HTMLDivElement>): void => thumbActiveHandler(e, index)}
            aria-hidden="true"
          >
            <img src={src} alt="product thumbnail" width="140" height="140" />
          </div>
        ))}
      </OwlCarousel>
    </div>
  )
}

ProductThumb.defaultProps = {
  index: 0
}

export default ProductThumb
