import React, { FC, useRef, useEffect, MutableRefObject, CSSProperties, ReactNode } from 'react'
import Carousel from 'react-owl-carousel2'

interface IOwlCarouselProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
  options?: any
  onChangeRef?: (ref: MutableRefObject<any>) => void
  onChangeIndex?: (index: number) => void
  events?: any
}

const OwlCarousel: FC<IOwlCarouselProps> = (props: IOwlCarouselProps) => {
  const carouselRef: MutableRefObject<any> = useRef(null)

  const defaultOptions: any = {
    items: 1,
    loop: false,
    margin: 0,
    responsiveClass: 'true',
    nav: true,
    navText: ['<i class="d-icon-angle-left">', '<i class="d-icon-angle-right">'],
    navElement: 'button',
    dots: true,
    smartSpeed: 400,
    autoplay: false,
    autoHeight: false
    // autoplayTimeout: 5000,
  }

  const events: any = {
    onTranslated(e: any) {
      if (!e.target) return
      if (props.onChangeIndex) {
        props.onChangeIndex(e.item.index)
      }
    }
  }

  useEffect(() => {
    if (props.onChangeRef) {
      props.onChangeRef(carouselRef)
    }
  }, [carouselRef])

  return (
    <Carousel
      ref={carouselRef}
      className={`owl-carousel ${props.className}`}
      style={props.style}
      options={{ ...defaultOptions, ...props.options }}
      events={{ ...events, ...props.events }}
    >
      {props.children}
    </Carousel>
  )
}

OwlCarousel.defaultProps = {
  className: '',
  style: {},
  options: {},
  onChangeRef: undefined,
  onChangeIndex: undefined,
  events: {}
}

export default OwlCarousel
