import React, { FC } from 'react'
import { Button, Row, Col, Form, Input,Select } from 'antd'
import t from '~/locales'
import styles from './SellerMyProductsFilters.module.scss'


interface IFormModel {
  productName: string
  productNameChoice: string
  date: string
}

const SellerMyProductFilters: FC = () => {
  const [form] = Form.useForm()

  function onSubmit(values: IFormModel): void {
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
          <Form.Item label={t('sellerProducts.list.filters.group')} name="productName">
            <Select defaultValue={t('sellerProducts.list.filters.orderId')}>
              <Option value="jack">Jack</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('sellerProducts.list.filters.keyword')} name="productNameChoice">
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('sellerProducts.list.filters.category')} name="date">
            <Select defaultValue=''>
              <Option value="jack">Jack</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item className="mb-0">
          <Button className="mr-3" htmlType="submit" type="primary">
            {t('sellerProducts.list.filters.search')}
          </Button>
        </Form.Item>
        <Form.Item className="mb-0">
          <Button htmlType="reset">{t('sellerProducts.list.filters.reset')}</Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default SellerMyProductFilters
