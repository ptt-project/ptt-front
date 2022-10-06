import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  FormInstance,
  Checkbox,
  Image
} from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IPromotionFormData } from '~/interfaces'
import AddModal from './components/AddModal'
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
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)
  const [form] = Form.useForm(parentForm)
  function toggleAddModal(): void {
    setIsOpenAddModal(!isOpenAddModal)
  }
  function onClickAddPromotion(): void {
    setIsOpenAddModal(true)
  }
  function onChange() {}
  return (
    <>
      <AddModal isOpen={isOpenAddModal} toggle={toggleAddModal} />
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
                  <Button type="primary" onClick={onClickAddPromotion}>
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
          <Col md={24}>
            <Row className={`${styles.hrTitleCol} text-center mb-3`}>
              <Col lg={2}>
                <Checkbox onChange={onChange} />
              </Col>
              <Col lg={5}>
                <Text type="danger">{t('seller.marketing:promotion.col.productName')}</Text>
              </Col>
              <Col lg={3}>
                <Text type="danger">{t('seller.marketing:promotion.col.discount')}</Text>
              </Col>
              <Col lg={6}>
                <Text type="danger">{t('seller.marketing:promotion.col.promotionWarehouse')}</Text>
              </Col>
              <Col lg={3}>
                <Text type="danger">{t('seller.marketing:promotion.col.purchaseLimit')}</Text>
              </Col>
              <Col lg={4}>
                <Text type="danger">{t('seller.marketing:promotion.col.operation')}</Text>
              </Col>
            </Row>
            <div className="text-center">
              <Image preview={false} width="80%" src="./images/main/seller/promotion-add.svg" />
            </div>
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
    </>
  )
}

export default PromotionForm
