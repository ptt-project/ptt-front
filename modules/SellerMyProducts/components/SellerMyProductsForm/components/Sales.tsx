import React, { useState } from 'react'
import { Typography, Radio, Col, Form, Input, Row, Select } from 'antd'
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
  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.sales.title')} />
      <Row gutter={[16, 8]}>
        <Col md={12}></Col>
        <Col md={12}>
          <Form.Item
            label={t('sellerProducts.form.features.brand')}
            name="brand"
            rules={[{ required: true }]}
          >
            <Select defaultValue="">
              <Option value=""></Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label={t('sellerProducts.form.features.weight')}
            name="weight"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input suffix={<Text type="secondary">{t('sellerProducts.form.features.kg')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('sellerProducts.form.features.shelfLife')} name="shelfLife">
            <Input suffix={<Text type="secondary">{t('sellerProducts.form.features.day')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('sellerProducts.form.features.condition')} name="condition">
            <Radio.Group>
              <Radio value={1} className="mr-5">
                {t('sellerProducts.form.features.old')}
              </Radio>
              <Radio value={2}>{t('sellerProducts.form.features.new')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
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
