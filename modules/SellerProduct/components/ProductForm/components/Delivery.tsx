import React from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Col, Form, Input, Row, Switch } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../ProductForm.module.scss'

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

  return (
    <>
      <HighlightLabel title={t('seller.product:form.delivery.title')} />
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item
            label={t('seller.product:form.delivery.weight')}
            name="weight"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.features.weight')}`
              }
            ]}
          >
            <Input suffix={<Text type="secondary">{t('seller.product:form.delivery.kg')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={4} xs={8}>
          <Form.Item label={t('seller.product:form.delivery.size')} name="width">
            <Input suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={4} xs={8}>
          <div className={styles.hiddenLabel} />
          <Form.Item name="length">
            <Input suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={4} xs={8}>
          <div className={styles.hiddenLabel} />
          <Form.Item name="height">
            <Input suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className={styles.spaceTitle}>
            {t('seller.product:form.delivery.shippingCost')}
          </Text>
          <Row>
            <Col className={styles.highlight} span={24}>
              <div className={styles.spaceBox}>
                <Text className={styles.spaceLabel}>
                  {t('seller.product:form.delivery.standardDelivery')}
                </Text>
                <div className={styles.switchBox}>
                  <Text type="secondary" className="mr-2">
                    {t('seller.product:form.delivery.msgShipping')}
                  </Text>
                  <Form.Item className="mb-0">
                    <Switch className="hps-switch" checked />
                  </Form.Item>
                </div>
              </div>
              <div className={styles.spaceBox}>
                <Text className={styles.spaceLabel}>{t('seller.product:form.delivery.ems')}</Text>
                <div className={styles.switchBox}>
                  <Text type="secondary" className="mr-2">
                    {t('seller.product:form.delivery.msgShipping')}
                  </Text>
                  <Form.Item className="mb-0">
                    <Switch className="hps-switch" checked />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
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
