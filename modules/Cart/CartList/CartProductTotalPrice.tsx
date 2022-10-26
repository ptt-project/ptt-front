import { Form } from 'antd'
import React, { FC, useMemo, useEffect } from 'react'
import InputNumberFormat from '~/components/main/InputNumberFormat'

interface ITotalPriceProps {
  productId: string
  isMobile?: boolean
}
const CartProductTotalPrice: FC<ITotalPriceProps> = (props: ITotalPriceProps) => {
  const { productId, isMobile } = props
  const [form] = Form.useForm()
  const price: number = Form.useWatch(['products', productId, 'price'])
  const amount: number = Form.useWatch(['products', productId, 'amount'])

  const totalPrice: number = useMemo(
    () => Number(price || 0) * Number(amount || 0),
    [price, amount]
  )

  useEffect(() => {
    form.setFieldValue(['products', productId, 'totalPrice'], totalPrice || 0)
  }, [totalPrice])

  return (
    <InputNumberFormat
      value={totalPrice}
      displayType="text"
      prefix={isMobile ? 'รวม: ฿' : ''}
      thousandSeparator
    />
  )
}

CartProductTotalPrice.defaultProps = {
  isMobile: false
}

export default CartProductTotalPrice
