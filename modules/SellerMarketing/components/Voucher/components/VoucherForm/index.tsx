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
  Select,
  Radio,
  FormInstance
} from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IVoucherFormData } from '~/interfaces'
import HighlightLabel from '~/components/main/HighlightLabel'

const { Text } = Typography

const { RangePicker } = DatePicker

interface IVoucherFormProps {
  parentForm: FormInstance
  initialValues?: Partial<IVoucherFormData>
  onSubmit: (values: IVoucherFormData) => void
}
const VoucherForm: FC<IVoucherFormProps> = (props: IVoucherFormProps) => {
  const { parentForm, initialValues, onSubmit } = props
  console.log('initialValues--', initialValues.voucherName)
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [form] = Form.useForm(parentForm)

  function onFormFinish(values: IVoucherFormProps): void {
    // onSubmit?.({ ...initialValues, ...values })
  }

  function onFormChange(values: IVoucherFormProps): void {
    console.log(values)
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onValuesChange={onFormChange}
      onFinish={onFormFinish}
    >
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
            name="code"
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
            name="periodCode"
            rules={[
              {
                required: true
              }
            ]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col md={24}>
          <HighlightLabel title={t('seller.marketing:voucher.form.discount')} />
        </Col>
        <Col md={12}>
          <Form.Item
            label={t('seller.marketing:voucher.form.typeDiscount')}
            name="typeDiscount"
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
            name="valueDiscount"
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
            name="minDiscount"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input
              suffix={<Text type="secondary">{t('seller.marketing:voucher.form.baht')}</Text>}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label={t('seller.marketing:voucher.form.amountAvailable')}
            name="amountAvailable"
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
  )
}

export default VoucherForm
