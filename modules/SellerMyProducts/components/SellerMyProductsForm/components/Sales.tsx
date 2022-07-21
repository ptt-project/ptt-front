import React, { useState } from 'react'
import { Typography, Switch, Radio, Col, Form, Input, Row, Select } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import styles from '../SellerMyProductsForm.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input
interface IFormProductSalesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Sales: React.FC<IFormProductSalesProps> = (props: IFormProductSalesProps) => {
  const [isCheckUseOptions, setIsCheckUseOptions] = useState<boolean>(false)
  const onChange = (checked: boolean) => {
    setIsCheckUseOptions(checked)
  }
  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.sales.title')} />
      <Row gutter={[16, 8]}>
        <Col md={24}>
          <Switch onChange={onChange} />
          <Text className="ml-2 mt-1">{t('sellerProducts.form.sales.useOptions')}</Text>
        </Col>
        {!isCheckUseOptions && (
          <>
            <Col md={12}>
              <Form.Item
                label={t('sellerProducts.form.sales.price')}
                name="price"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input
                  suffix={<Text type="secondary">{t('sellerProducts.form.sales.baht')}</Text>}
                />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label={t('sellerProducts.form.sales.warehouse')} name="warehouse">
                <Input />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item
                label={
                  <Text>
                    {t('sellerProducts.form.sales.sku')}
                    <Text className="ml-1" type="secondary">
                      {t('sellerProducts.form.sales.msgSku')}
                    </Text>
                  </Text>
                }
                name="sku"
              >
                <TextArea rows={1} showCount maxLength={20} />
              </Form.Item>
            </Col>
          </>
        )}
        {isCheckUseOptions && <></>}
      </Row>
    </>
  )
}

Sales.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default Sales
