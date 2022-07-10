import React, { FC } from 'react'
import { Typography, Button, Row, Col, Form, Input } from 'antd'
import t from '~/locales'
import styles from './PointFormSearch.module.scss'

const { Text } = Typography

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
    <Form layout="vertical" form={form} name="formSearch" onFinish={onSubmit} className={styles.highlight}>
      <Row gutter={[8, 8]} className='mt-3'>
        <Col className='ml-5' md={10} xs={20}>
          <Form.Item label={t('shopPoint.formSearch.productName')} name="productName">
            <Input />
          </Form.Item>
        </Col>
        <Col className='ml-5' md={10} xs={20}>
          <Form.Item label={t('shopPoint.formSearch.productNameChoice')} name="productNameChoice">
            <Input />
          </Form.Item>
        </Col>
        <Col className='ml-5' md={10} xs={20}>
          <Form.Item label={t('shopPoint.formSearch.date')} name="date">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row >
        <Col className='ml-5' xs={4}>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              {t('shopPoint.formSearch.search')}
            </Button>
          </Form.Item>
        </Col>
        <Col className='ml-5' xs={4}>
          <Button htmlType="reset" block>
            {t('shopPoint.formSearch.reset')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default PointFormSearch
