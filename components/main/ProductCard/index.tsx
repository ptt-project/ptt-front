import React, { FC, useEffect } from 'react'
import Link from 'next/link'
import numeral from 'numeral'
import styles from './ProductCard.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Tag, Rate } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse } from '~/interfaces'
import { ProductService } from '~/services'
const { Text } = Typography
const ProductCard: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'product'])

  async function fetchData(): Promise<void> {
    try {
      const res: IApiResponse = await ProductService.get()
      //console.log('res+++', res)
    } catch (error) {
      console.log(error)
    }
  }

  function renderProducts(): JSX.Element[] {
    const images: string[] = []
    for (let i: number = 0; i < 8; i++) {
      images.push('https://dummyimage.com/800x800?text=800 x 800')
    }
    const items: JSX.Element[] = images.map((src: string, index: number) => (
      <Col lg={6} md={8} xs={12} key={index}>
        <Link href="/product/1">
          <a className={styles.box}>
            <div className={styles.imgContainer}>
              <div className={styles.imgWrapper}>
                <img src={src} alt="product" />
              </div>
              <Tag color="#40a9ff" className={styles.tagRecommended}>
                {t('product:card.recommended')}
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
          </a>
        </Link>
      </Col>
    ))
    return items
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <Row gutter={[24, 24]}>{renderProducts()}</Row>
}

ProductCard.defaultProps = {
  page: ''
}

export default ProductCard
