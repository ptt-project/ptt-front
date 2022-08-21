import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  DatePickerProps,
  Select,
  Radio
} from 'antd'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './VoucherForm.module.scss'

const { Text } = Typography

interface IFormModel {
  isSeller?: boolean
}
const VoucherForm: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [form] = Form.useForm()

  function onSubmit(values: IFormModel): void {
    console.log(values)
  }
  const onChange: DatePickerProps['onChange'] = (date: moment.Moment, dateString: string) => {
    console.log(date, dateString)
  }
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.marketing:voucher.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.marketing:title') },
          {
            title: t('seller.marketing:voucher.title'),
            href: '/seller/settings/marketing/voucher'
          },
          {
            title: t('seller.marketing:voucher.buttonCreate'),
            href: '/seller/settings/marketing/add-voucher'
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Text>
                <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                  {t('seller.marketing:voucher.form.title')}
                </h4>
              </Text>
              <HighlightLabel title={t('seller.marketing:voucher.form.general')} />
              <Form layout="vertical" form={form} name="productForm" onFinish={onSubmit}>
                <Row gutter={[16, 8]} className="mt-3">
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.voucherName')}
                      name="voucherName"
                      rules={[{ required: true }]}
                    >
                      <Input />
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('seller.marketing:voucher.form.msgVoucherName')}
                      </Text>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.voucher')}
                      name="weight"
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <Input />
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('seller.marketing:voucher.form.msgVoucher')}
                      </Text>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.periodCode')}
                      name="weight"
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <DatePicker onChange={onChange} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col md={24}>
                    <HighlightLabel title={t('seller.marketing:voucher.form.discount')} />
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.typeDiscount')}
                      name="brand"
                      rules={[{ required: true }]}
                    >
                      <Select defaultValue="">
                        <Select.Option value="">โดย %</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.valueDiscount')}
                      name="weight"
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <Input suffix={<Text type="secondary">%</Text>} />
                    </Form.Item>
                  </Col>
                  <Col md={24}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.maxDiscount')}
                      name="maxDiscount"
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <Radio.Group>
                        <Radio value={1}>{t('seller.marketing:voucher.form.unLimit')}</Radio>
                        <Radio value={2} className="ml-10">
                          {t('seller.marketing:voucher.form.limit')}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.minDiscount')}
                      name="weight"
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <Input
                        suffix={
                          <Text type="secondary">{t('seller.marketing:voucher.form.baht')}</Text>
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      label={t('seller.marketing:voucher.form.amountAvailable')}
                      name="weight"
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
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
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default VoucherForm
