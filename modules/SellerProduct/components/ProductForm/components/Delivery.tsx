import React, { ChangeEvent, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Col, Form, Input, Row, Switch, FormInstance } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import styles from '../ProductForm.module.scss'

const { Text } = Typography

interface IDeliveryProps {
  form: FormInstance
}

const Delivery: FC<IDeliveryProps> = (props: IDeliveryProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  function onChange(e: ChangeEvent<HTMLInputElement>, name: string): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      props.form.setFieldValue(name, e.target.value)
    } else {
      props.form.setFieldValue(name, e.target.value.replace(RegExpConst.ALLOW_NUMBER_AND_DOT, ''))
    }
  }

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
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.kg')}</Text>}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(e, 'weight')}
            />
          </Form.Item>
        </Col>
        <Col md={4} xs={8}>
          <Form.Item
            label={t('seller.product:form.delivery.size')}
            name="width"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.delivery.width')}`
              }
            ]}
          >
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(e, 'width')}
            />
          </Form.Item>
        </Col>
        <Col md={4} xs={8}>
          <div className={styles.hiddenLabel} />
          <Form.Item
            name="length"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.delivery.length')}`
              }
            ]}
          >
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(e, 'length')}
            />
          </Form.Item>
        </Col>
        <Col md={4} xs={8}>
          <div className={styles.hiddenLabel} />
          <Form.Item
            name="height"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.delivery.height')}`
              }
            ]}
          >
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.delivery.cm')}</Text>}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => onChange(e, 'height')}
            />
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

export default Delivery
