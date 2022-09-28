import React, { Col, Image, Row, Typography } from 'antd'
import { compact } from 'lodash'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { ICartProduct } from '~/interfaces'
import styles from './CartProductDetail.module.scss'

interface ICartProductDetailProps {
  product: ICartProduct
}
const CartProductDetail: FC<ICartProductDetailProps> = (props: ICartProductDetailProps) => {
  const { product } = props
  const { name, option1, option2 } = product

  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])

  return (
    <Row wrap={false} className={styles.layout} gutter={8} justify="start" align="top">
      <Col className={styles.image}>
        <Image preview={false} src="./images/main/buyer/mock-cart-product.svg" />
      </Col>
      <Col className={styles.name}>
        <Typography.Paragraph
          ellipsis={{
            rows: 2
          }}
        >
          {name}
        </Typography.Paragraph>
      </Col>
      <Col className={styles.option}>
        <Typography.Paragraph
          ellipsis={{
            rows: 2
          }}
        >
          {t('ตัวเลือกสินค้า: {{option}}', {
            option: compact([option1, option2]).join(', ') || '-'
          })}
        </Typography.Paragraph>
      </Col>
    </Row>
  )
}

export default CartProductDetail
