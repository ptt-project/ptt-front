import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Row, Col, Form, Input, Select } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import styles from './ProductFilters.module.scss'

interface IFormData {
  productName: string
  productNameChoice: string
  date: string
}

const ProductFilters: FC = () => {
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
          <Form.Item label={t('seller.product:list.filters.group')} name="productName">
            <Select defaultValue={t('seller.product:list.filters.orderId')}>
              <Select.Option value="jack">Jack</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:list.filters.keyword')} name="productNameChoice">
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:list.filters.category')} name="date">
            <Select defaultValue="">
              <Select.Option value="jack">Jack</Select.Option>
            </Select>
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

export default ProductFilters
