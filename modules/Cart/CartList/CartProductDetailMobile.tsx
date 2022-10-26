import React, { Col, Form, Image, Row, Space, Typography } from 'antd'
import { compact } from 'lodash'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import InputNumberFormat from '~/components/main/InputNumberFormat'
import { LocaleNamespaceConst } from '~/constants'
import { ICartProduct } from '~/interfaces'
import { HelperDecimalFormatUtil } from '~/utils/main'
import InputCounter from './InputCounter'
import styles from './CartList.module.scss'
import CartProductTotalPrice from './CartProductTotalPrice'

interface ICartProductDetailMobileProps {
  productId: string
  product: ICartProduct
  onAmountBlur: (amount: number) => void
  onDeleteClick: () => void
}
const CartProductDetailMobile: FC<ICartProductDetailMobileProps> = (
  props: ICartProductDetailMobileProps
) => {
  const { productId, product, onAmountBlur, onDeleteClick } = props

  const { t } = useTranslation([...LocaleNamespaceConst, 'cart'])

  const { productProfile, stock = 0, option1, option2 } = product
  const { name } = productProfile || {}

  return (
    <Col>
      <Space
        className={styles.cartProductDetailMobile}
        size={8}
        direction="vertical"
        align="center"
      >
        <Row justify="center" align="middle">
          <Image
            preview={false}
            src="./images/main/buyer/mock-cart-product.svg"
            alt="mock-cart-product"
          />
        </Row>
        <Row justify="center" align="middle">
          <Typography.Text ellipsis>{name}</Typography.Text>
        </Row>
        <Row justify="center" align="middle">
          <Typography.Text>
            {t('ตัวเลือกสินค้า: {{option}}', {
              option: compact([option1, option2]).join(', ') || '-'
            })}
          </Typography.Text>
        </Row>
        <Row justify="center" align="middle">
          <Form.Item name={['products', productId, 'price']} shouldUpdate noStyle>
            <InputNumberFormat displayType="text" thousandSeparator />
          </Form.Item>
        </Row>
        <Row justify="center" align="middle" gutter={[8, 8]} style={{ maxWidth: '134px' }}>
          <Col>
            <Form.Item name={['products', productId, 'amount']} shouldUpdate noStyle>
              <InputCounter
                min={0}
                max={stock}
                onBlur={onAmountBlur}
                onValueToZero={onDeleteClick}
              />
            </Form.Item>
          </Col>
          <Row justify="center" align="middle">
            <Typography.Text>
              {t('เหลือ {{stock}} ชิ้น', { stock: HelperDecimalFormatUtil(stock, 0) })}
            </Typography.Text>
          </Row>
        </Row>
      </Space>
      <Row className="mt-2" justify="space-between" align="middle">
        <Col>
          <Form.Item name={['products', productId, 'amount']} shouldUpdate noStyle>
            <CartProductTotalPrice productId={productId} isMobile />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={['products', productId, 'id']} hidden />
          <Form.Item name={['products', productId, 'id']} hidden />
          <DeleteOutlined onClick={onDeleteClick} />
        </Col>
      </Row>
    </Col>
  )
}

export default CartProductDetailMobile
