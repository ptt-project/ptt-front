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
  Radio,
  FormInstance
} from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IVoucherFormData } from '~/interfaces'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './VoucherForm.module.scss'

const { Text } = Typography

interface IVoucherFormProps {
  parentForm: FormInstance
  initialValues?: Partial<IVoucherFormData>
  onSubmit: (values: IVoucherFormData) => void
}
const VoucherForm: FC<IVoucherFormProps> = (props: IVoucherFormProps) => {
  const { parentForm, initialValues, onSubmit } = props
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])
  const [form] = Form.useForm(parentForm)

  function onFormFinish(values: IVoucherFormProps): void {
    console.log({ formValues: values })
    onSubmit?.({ ...initialValues, ...values })
  }
  const onChange: DatePickerProps['onChange'] = (date: moment.Moment, dateString: string) => {
    console.log(date, dateString)
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
              suffix={<Text type="secondary">{t('seller.marketing:voucher.form.baht')}</Text>}
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
  )
}

export default VoucherForm
