import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import numeral from 'numeral'
import styles from './ProductCard.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Tag, Rate } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IProduct } from '~/interfaces'
import { ImageSizeEnum } from '~/enums'
import { ImageUrlUtil } from '~/utils/main'
import { ProductService } from '~/services'

const { Text } = Typography

const ProductCard: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'product'])
  const [isProduct, setProduct] = useState<IProduct[]>([])

  async function fetchData(): Promise<void> {
    try {
      const res: IApiResponse = await ProductService.get()
      if (res.data.items) {
        setProduct(res.data.items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function renderProducts(): JSX.Element[] {
    const items: JSX.Element[] = []
    isProduct.forEach((item: IProduct) => {
      const imageId: string = item.imageIds[0] ? item.imageIds[0] : null
      items.push(
        <Col lg={6} md={8} xs={12} key={item.id}>
          <Link href="/product/1">
            <a className={styles.box}>
              <div className={styles.imgContainer}>
                <div className={styles.imgWrapper}>
                  <img src={ImageUrlUtil(imageId, ImageSizeEnum.MEDIUM)} alt="product" />
                </div>
                {item.isRecommended ? (
                  <Tag color="#40a9ff" className={styles.tagRecommended}>
                    {t('product:card.recommended')}
                  </Tag>
                ) : (
                  ''
                )}
                <Tag color="red" className={styles.tagSell}>
                  <i className="fas fa-angle-double-down mr-2" />
                  XX%
                </Tag>
              </div>
              <div className={styles.detailContainer}>
                <Text className={styles.dTitle}>{item.name}</Text>
                <Text className={styles.dAmount}>฿{numeral(item.price).format('0,0')}</Text>
                <Text className={`${styles.dSold} hps-text-small`} type="secondary">
                  {t('common:sold')} {numeral(item.amountSold).format('0,0')} ชิ้น
                </Text>
                <Rate
                  className="hps-rating hps-text-small"
                  disabled
                  defaultValue={item.scoreCount}
                />
              </div>
              <div className={styles.favorite}>
                <i className="far fa-heart" />
              </div>
            </a>
          </Link>
        </Col>
      )
    })

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
