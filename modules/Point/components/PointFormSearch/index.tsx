import React, { FC } from 'react'
import { Button, Row, Col, Form, Input, DatePicker } from 'antd'
import t from '~/locales'
import styles from './PointFormSearch.module.scss'

const { RangePicker } = DatePicker

interface IFormModel {
  productName: string
  productNameChoice: string
  date: string
}

const PointFormSearch: FC = () => {
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
        <Col lg={12} sm={24}>
          <Form.Item label={t('shopPoint.formSearch.productName')} name="productName">
            <Input />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item label={t('shopPoint.formSearch.productNameChoice')} name="productNameChoice">
            <Input />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item label={t('shopPoint.formSearch.date')} name="date">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item className="mb-0">
          <Button className="mr-3" htmlType="submit" type="primary">
            {t('shopPoint.formSearch.search')}
          </Button>
        </Form.Item>
        <Form.Item className="mb-0">
          <Button htmlType="reset">{t('shopPoint.formSearch.reset')}</Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default PointFormSearch
