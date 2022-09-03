import React from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Col, Form, Input, Row, Switch } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../SellerMyProductsForm.module.scss'

const { Text } = Typography

interface IFormProductFeaturesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}

const Delivery: React.FC<IFormProductFeaturesProps> = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  function onChange(checked: boolean): void {
    console.log(`switch to ${checked}`)
  }

  return (
    <>
      <HighlightLabel title={t('seller.product:form.delivery.title')} />
      <Row gutter={[16, 8]}>
        <Col md={12}>
          <Form.Item
            label={t('seller.product:form.delivery.weight')}
            name="weight"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input suffix={<Text type="secondary">{t('seller.product:form.delivery.kg')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('seller.product:form.delivery.size')} name="size">
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>}
              style={{ width: 100 }}
            />
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>}
              className="mr-3 ml-3"
              style={{ width: 100 }}
            />
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>}
              style={{ width: 100 }}
            />
          </Form.Item>
        </Col>
        <Col md={24}>
          <Form.Item
            label={t('seller.product:form.delivery.shippingCost')}
            name="shippingCost"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Row gutter={[8, 8]} className={styles.highlight}>
              <Col md={20}>
                <Text className="ml-2">{t('seller.product:form.delivery.standardDelivery')}</Text>
              </Col>
              <Col md={3} className="text-right">
                <Switch onChange={onChange} defaultChecked />
              </Col>
              <Col md={20}>
                <Text className="ml-2">{t('seller.product:form.delivery.ems')}</Text>
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
