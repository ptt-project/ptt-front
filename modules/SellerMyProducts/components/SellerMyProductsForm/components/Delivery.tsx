import React, { useState } from 'react'
import { Typography, Col, Form, Input, Row, Switch } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import styles from '../SellerMyProductsForm.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input
interface IFormProductFeaturesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Delivery: React.FC<IFormProductFeaturesProps> = (props: IFormProductFeaturesProps) => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }
  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.delivery.title')} />
      <Row gutter={[16, 8]}>
        <Col md={12}>
          <Form.Item
            label={t('sellerProducts.form.delivery.weight')}
            name="weight"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input suffix={<Text type="secondary">{t('sellerProducts.form.delivery.kg')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('sellerProducts.form.delivery.size')} name="size">
            <Input
              suffix={<Text type="secondary">{t('sellerProducts.form.delivery.cm')}</Text>}
              style={{ width: 100 }}
            />
            <Input
              suffix={<Text type="secondary">{t('sellerProducts.form.delivery.cm')}</Text>}
              className="mr-3 ml-3"
              style={{ width: 100 }}
            />
            <Input
              suffix={<Text type="secondary">{t('sellerProducts.form.delivery.cm')}</Text>}
              style={{ width: 100 }}
            />
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item
            label={t('sellerProducts.form.delivery.shippingCost')}
            name="shippingCost"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Row gutter={[8, 8]} className={styles.highlight}>
              <Col md={20}>
                <Text className="ml-2">{t('sellerProducts.form.delivery.standardDelivery')}</Text>
              </Col>
              <Col md={3} className="text-right">
                <Switch onChange={onChange} defaultChecked />
              </Col>
              <Col md={20}>
                <Text className="ml-2">{t('sellerProducts.form.delivery.ems')}</Text>
              </Col>
              <Col md={3} className="text-right">
                <Switch onChange={onChange} defaultChecked />
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

Delivery.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default Delivery
