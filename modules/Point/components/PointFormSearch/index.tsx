import React, { FC } from 'react'
import { Button, Row, Col, Form, Input,DatePicker,Space } from 'antd'
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
    <Form layout="vertical" form={form} name="formSearch" onFinish={onSubmit} className={styles.highlight}>
      <Row gutter={[8, 8]} className='mt-3'>
        <Col md={{ span: 10, offset: 1 }} xs={20}>
          <Form.Item label={t('shopPoint.formSearch.productName')} name="productName" >
            <Input />
          </Form.Item>
        </Col>
        <Col md={{ span: 10, offset: 2}} xs={20}>
          <Form.Item label={t('shopPoint.formSearch.productNameChoice')} name="productNameChoice">
            <Input />
          </Form.Item>
        </Col>
        <Col md={{ span: 10, offset: 1 }} xs={20}>
          <Form.Item label={t('shopPoint.formSearch.date')} name="date">
            <RangePicker/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 1 }} xs={4}>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              {t('shopPoint.formSearch.search')}
            </Button>
          </Form.Item>
        </Col>
        <Col md={{ span: 4, offset: 1 }} xs={4}>
          <Button htmlType="reset" block>
            {t('shopPoint.formSearch.reset')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default PointFormSearch
