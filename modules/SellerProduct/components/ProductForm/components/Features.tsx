import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Radio, Col, Form, Input, Row, Select } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../ProductForm.module.scss'

const { Text } = Typography

const Features: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  return (
    <>
      <HighlightLabel title={t('seller.product:form.features.title')} />
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.features.brand')} name="brandId">
            <Select>
              <Select.Option value={null}>{t('common:form.option')}</Select.Option>
              <Select.Option value={1}>Adidas</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label={t('seller.product:form.features.weight')}
            name="weight"
            rules={[
              {
                required: true,
                message: `${t('common:form.required')} ${t('seller.product:form.features.weight')}`
              }
            ]}
          >
            <Input suffix={<Text type="secondary">{t('seller.product:form.features.kg')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.features.shelfLife')} name="exp">
            <Input suffix={<Text type="secondary">{t('seller.product:form.features.day')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.features.condition')} name="condition">
            <Radio.Group className={styles.radio}>
              <Radio value="old">{t('seller.product:form.features.old')}</Radio>
              <Radio value="new">{t('seller.product:form.features.new')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Features
