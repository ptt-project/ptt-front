import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Form, Input, DatePicker, FormInstance } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IPromotionFormData } from '~/interfaces'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './PromotionForm.module.scss'

const { Text, Title } = Typography

const { RangePicker } = DatePicker

interface IPromotionFormProps {
  parentForm: FormInstance
  initialValues?: Partial<IPromotionFormData>
  onSubmit: (values: IPromotionFormData) => void
}
const PromotionForm: FC<IPromotionFormProps> = (props: IPromotionFormProps) => {
  const { parentForm, initialValues, onSubmit } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [form] = Form.useForm(parentForm)

  return (
    <Form layout="vertical" form={form} initialValues={props.initialValues}>
      <Row gutter={[16, 8]} className="mt-3">
        <Col md={12}>
          <Form.Item
            label={t('seller.marketing:promotion.form.promotionName')}
            name="voucherName"
            rules={[{ required: true }]}
            className="mb-1"
          >
            <Input />
          </Form.Item>
          <Text type="secondary" className="hps-text-small d-block">
            {t('seller.marketing:promotion.form.msgPromotionName')}
          </Text>
        </Col>
        <Col md={12}>
          <Form.Item
            label={t('seller.marketing:promotion.form.period')}
            name="periodCode"
            rules={[
              {
                required: true
              }
            ]}
          >
            <DatePicker className="w-100" format="DD/MM/yyyy" />
          </Form.Item>
        </Col>
        <Col className={styles.highlight} span={24}>
          <Row gutter={[8, 16]}>
            <Col xs={20}>
              <Title className={`${styles.h4} ${styles.textSecondary}`} level={5}>
                {t('seller.marketing:promotion.title')}
              </Title>
            </Col>
            <Col xs={4}>
              <div className={styles.addNewProduct}>
                <Button type="primary">
                  <i className="fas fa-plus mr-1" />
                  {t('seller.marketing:promotion.buttonCreate')}
                </Button>
              </div>
            </Col>
            <Col xs={10}>
              <Form.Item name="productSearch">
                <Input
                  placeholder={t('seller.marketing:promotion.form.productSearch')}
                  suffix={
                    <Text type="secondary">
                      <i className="d-icon-search" />
                    </Text>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col md={12}>
          <Button type="text" block>
            {t('common:cancel')}
          </Button>
        </Col>
        <Col md={12}>
          <Button htmlType="submit" type="primary" block>
            {t('common:save')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default PromotionForm
