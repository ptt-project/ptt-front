import React, { FC, CSSProperties } from 'react'
import { Typography, Carousel } from 'antd'

const { Title } = Typography

const contentStyle: CSSProperties = {
  height: '360px',
  color: '#fff',
  lineHeight: '360px',
  textAlign: 'center',
  background: '#364d79'
}

const Banner: FC = () => (
  <Carousel swipeToSlide draggable>
    <div>
      <Title style={contentStyle} level={3}>
        1
      </Title>
    </div>
    <div>
      <Title style={contentStyle} level={3}>
        2
      </Title>
    </div>
    <div>
      <Title style={contentStyle} level={3}>
        3
      </Title>
    </div>
    <div>
      <Title style={contentStyle} level={3}>
        4
      </Title>
    </div>
  </Carousel>
)

export default Banner
