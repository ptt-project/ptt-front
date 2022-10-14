import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Modal, Form, Input, DatePicker } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import styles from './../../PromotionForm/PromotionForm.module.scss'

const { Text, Title } = Typography

interface IAddModalProps {
  isOpen: Boolean
  toggle: () => void
}

interface IMockData {
  id: string
  name: string
  list: string
  status: string
  colorStatus: string
  periodGetCode: string
}

const data: IMockData[] = [
  {
    id: '1',
    name: 'Glove Discount',
    list: 'Everlast Weight Lifting Gloves',
    status: 'เร็วๆนี้',
    colorStatus: 'gold',
    periodGetCode: '01/07/2022 00:00 - 31/08/2022 23:59'
  },
  {
    id: '2',
    name: 'Mid year sale 2021',
    list: 'EVERLAST WEIGHTED เสื้อถ่วงน้ำหนัก',
    status: 'หมดอายุ',
    colorStatus: 'red',
    periodGetCode: '01/07/2022 00:00 - 31/08/2022 23:59'
  }
]
const AddModal: FC<IAddModalProps> = (props: IAddModalProps) => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const [form] = Form.useForm()

  function toggle(): void {
    props.toggle()
  }

  function onSubmit(): void {}

  return (
    <Modal
      title={
        <Title className="mb-0" level={4}>
          {t('seller.marketing:promotion.titleSelectProduct')}
        </Title>
      }
      visible={props.isOpen}
      onCancel={toggle}
      width={1000}
      footer={
        <Row>
          <Col className="text-right" span={24}>
            <Button type="default" onClick={toggle}>
              {t('common:cancel')}
            </Button>
            <Button className="ml-2" type="primary" onClick={onSubmit}>
              {t('common:ok')}
            </Button>
          </Col>
        </Row>
      }
      closable={false}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={32} className={styles.highlight}>
          <Col md={12} xs={24}>
            <Form.Item
              label={t('seller.marketing:promotion.form.categoryProduct')}
              name="productNameChoice"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label={t('seller.marketing:promotion.form.productName')}
              name="productNameChoice"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Button className="mr-3" htmlType="submit" type="primary">
              {t('common:search')}
            </Button>
            <Button htmlType="reset">{t('common:reset')}</Button>
          </Col>
        </Row>
      </Form>
      <Row className={`${styles.hrTitleCol} text-center mb-3`}>
        <Col lg={2}></Col>
        <Col lg={5}>
          <Text type="danger">{t('seller.marketing:promotion.form.productName')}</Text>
        </Col>
        <Col lg={3}>
          <Text type="danger">{t('seller.marketing:promotion.col.sale')}</Text>
        </Col>
        <Col lg={3}>
          <Text type="danger">{t('seller.marketing:promotion.col.price')}</Text>
        </Col>
        <Col lg={5}>
          <Text type="danger">{t('seller.marketing:promotion.col.warehouse')}</Text>
        </Col>
      </Row>
    </Modal>
  )
}

AddModal.defaultProps = {}

export default AddModal
