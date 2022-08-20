import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import numeral from 'numeral'
import { Typography, Row, Col, Tag, Rate } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import styles from './Product.module.scss'

const { Text, Title, Link } = Typography

interface IProductProps {
  page?: 'Home' | ''
}

const Product: FC<IProductProps> = (props: IProductProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'product'])

  function renderProducts(): JSX.Element[] {
    const images: string[] = []
    for (let i: number = 0; i < 16; i++) {
      images.push('https://dummyimage.com/800x800?text=800 x 800')
    }
    const items: JSX.Element[] = images.map((src: string, index: number) => (
      <Col lg={6} md={8} xs={12} key={index}>
        <div className={styles.box}>
          <div className={styles.imgContainer}>
            <div className={styles.imgWrapper}>
              <img src={src} alt="product" />
            </div>
            <Tag color="#40a9ff" className={styles.tagRecommended}>
              {t('product:recommended')}
            </Tag>
            <Tag color="red" className={styles.tagSell}>
              <i className="fas fa-angle-double-down mr-2" />
              XX%
            </Tag>
          </div>
          <div className={styles.detailContainer}>
            <Text className={styles.dTitle}>Mock Up Title XXXXXXXXXXXXXXXXXXXX</Text>
            <Text className={styles.dAmount}>฿{numeral(5555).format('0,0')}</Text>
            <Text className={`${styles.dSold} hps-text-small`} type="secondary">
              {t('common:sold')} {numeral(10).format('0,0')} ชิ้น
            </Text>
            <Rate className="hps-rating hps-text-small" disabled defaultValue={3} />
          </div>
          <div className={styles.favorite}>
            <i className="far fa-heart" />
          </div>
        </div>
      </Col>
    ))
    return items
  }

  return (
    <>
      {props.page === 'Home' ? (
        <Row className={styles.header} align="middle">
          <Col span={16}>
            <Title className={styles.title} level={3}>
              {t('product:title')}
            </Title>
          </Col>
          <Col className="text-right" span={8}>
            <Link href="#">
              <a className="hps-link">{t('common:viewAll')}</a>
            </Link>
          </Col>
        </Row>
      ) : null}
      <Row gutter={[24, 24]}>{renderProducts()}</Row>
    </>
  )
}

Product.defaultProps = {
  page: ''
}

export default Product
