import React, { useState, useEffect, FC } from 'react'
import { Carousel } from 'antd'

interface IImages {
  mobile: string
  desktop: string
}

const images: IImages[] = [
  {
    mobile: 'https://dummyimage.com/1280x720?text=Banner 1 (1280 x 720)',
    desktop: 'https://dummyimage.com/1920x800?text=Banner 1 (1920 x 800)'
  },
  {
    mobile: 'https://dummyimage.com/1280x720?text=Banner 2 (1280 x 720)',
    desktop: 'https://dummyimage.com/1920x800?text=Banner 2 (1920 x 800)'
  },
  {
    mobile: 'https://dummyimage.com/1280x720?text=Banner 3 (1280 x 720)',
    desktop: 'https://dummyimage.com/1920x800?text=Banner 3 (1920 x 800)'
  },
  {
    mobile: 'https://dummyimage.com/1280x720?text=Banner 4 (1280 x 720)',
    desktop: 'https://dummyimage.com/1920x800?text=Banner 4 (1920 x 800)'
  }
]

const Banner: FC = () => {
  const [dimension, setDimension] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0
  })

  useEffect(() => {
    onChangeDimension()
    window.addEventListener('resize', onChangeDimension)

    return (): void => {
      window.removeEventListener('resize', onChangeDimension)
    }
  }, [])

  function onChangeDimension(): void {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }

  function renderImages(): JSX.Element[] {
    const items: JSX.Element[] = images.map((data: IImages, index: number) => (
      <div key={index}>
        <img src={dimension.width >= 1200 ? data.desktop : data.mobile} alt="banner" />
      </div>
    ))
    return items
  }

  return (
    <Carousel swipeToSlide draggable autoplay>
      {renderImages()}
    </Carousel>
  )
}

export default Banner
