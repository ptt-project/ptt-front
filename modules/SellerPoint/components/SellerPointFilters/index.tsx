import React, { FC } from 'react'
import styles from './SellerPointFilters.module.scss'
import { useTranslation } from 'next-i18next'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { RangePicker } = DatePicker

interface IFormData {
  productName: string
  productNameChoice: string
  date: string
}

const SellerPointFilters: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.point'])
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
          <Form.Item label={t('seller.point:filters.productName')} name="productName">
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.point:filters.productNameChoice')} name="productNameChoice">
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.point:filters.date')} name="date">
            <RangePicker style={{ width: '100%' }} />
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

export default SellerPointFilters
