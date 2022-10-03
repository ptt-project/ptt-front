import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import styles from './PromotionFormSearch.module.scss'

interface IFormData {
  productName: string
  productNameChoice: string
  date: string
}

const PromotionFormSearch: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [form] = Form.useForm()

  function onSubmit(values: IFormData): void {
    console.log(values)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      name="formSearch"
      onFinish={onSubmit}
      className={styles.highlight}
    >
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item
            label={t('seller.marketing:promotion.form.promotionName')}
            name="productNameChoice"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.marketing:promotion.form.period')} name="productNameChoice">
            <DatePicker className="w-100" format="DD/MM/yyyy" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item className="mb-0">
          <Button className="mr-3" htmlType="submit" type="primary">
            {t('common:search')}
          </Button>
        </Form.Item>
        <Form.Item className="mb-0">
          <Button htmlType="reset">{t('common:reset')}</Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default PromotionFormSearch
