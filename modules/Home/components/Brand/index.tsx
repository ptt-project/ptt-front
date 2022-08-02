import React, { FC } from 'react'
import numeral from 'numeral'
import { Typography, Row, Col, Image, Button } from 'antd'
import t from '~/locales'
import styles from './Brand.module.scss'

const { Text, Title, Link } = Typography

const Promotion: FC = () => {
  function renderBrand(): JSX.Element[] {
    const images: string[] = [
      './images/brands/1.png',
      './images/brands/2.png',
      './images/brands/3.png',
      './images/brands/4.png',
      './images/brands/5.png',
      './images/brands/6.png',
      'https://via.placeholder.com/400x400?text=400 x 400',
      'https://via.placeholder.com/400x400?text=400 x 400'
    ]

    return images.map((src: string, index: number) => (
      <Col lg={6} md={8} xs={12} key={index}>
        <div className={styles.brand}>
          <div className={styles.brandImg}>
            <img src={src} alt="brand" />
          </div>
          <Text className={styles.label}>
            {index % 2 === 0
              ? `${t('home.brand.sell')} xx%`
              : `${t('home.brand.start')} ฿${numeral(555).format('0,0')}`}
          </Text>
        </div>
      </Col>
    ))
  }

  return (
    <>
      <Row className={styles.header} align="middle">
        <Col span={16}>
          <Title className={styles.title} level={3}>
            {t('home.brand.title')}
          </Title>
        </Col>
        <Col className="text-right" span={8}>
          <Link href="#" className="hps-link">
            {t('common.viewAll')}
          </Link>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} xs={24}>
          <div className={styles.imgContainer}>
            <Image
              rootClassName={styles.imgWrapper}
              preview={false}
              src="./images/main/buyer/register-shop.jpg"
              alt="login"
            />
          </div>
          <div className={styles.btnBox}>
            <Button type="primary">
              <i className="fas fa-store mr-2" />
              {t('home.brand.button')}
            </Button>
          </div>
        </Col>
        <Col lg={16} md={12} xs={24}>
          <Row gutter={[16, 16]}>{renderBrand()}</Row>
        </Col>
      </Row>
    </>
  )
}

export default Promotion
