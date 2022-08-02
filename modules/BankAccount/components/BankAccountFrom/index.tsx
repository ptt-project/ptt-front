/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Input, Form, FormInstance, Col, Row, Select } from 'antd'
import { DeepPartial } from 'redux'
import { DefaultOptionType } from 'antd/lib/select'
import { Rule } from 'antd/lib/form'
import { keyBy } from 'lodash'
import styles from './BankAccountFrom.module.scss'
import t from '~/locales'
import { BankName, IBankAccountFromValues, IBankOptionData } from '~/model/BankAccount'
import HighlightLabel from '~/components/main/HighlightLabel'

const bankOptionsData: IBankOptionData[] = [
  {
    bankFullName: 'กรุงศรี',
    bankName: BankName.BAY
  },
  {
    bankFullName: 'กสิกรไทย',
    bankName: BankName.KBANK
  }
]
const bankOptions: DefaultOptionType[] = bankOptionsData.map((d: IBankOptionData) => ({
  label: `${d.bankFullName} (${d.bankName})`,
  value: d.bankName
}))

// eslint-disable-next-line @typescript-eslint/typedef
const bankOptionsHash = keyBy(bankOptionsData, (v) => v.bankName)

interface IBankAccountFromProps {
  parentForm: FormInstance
  initialValues?: Partial<IBankAccountFromValues>
  onSubmit: (values: IBankAccountFromValues) => void
}

const BankAccountFrom: React.FC<IBankAccountFromProps> = (props: IBankAccountFromProps) => {
  const { parentForm, initialValues, onSubmit } = props

  const [form] = Form.useForm(parentForm)
  const [, /* formValues */ setFormValues] = useState<DeepPartial<IBankAccountFromValues>>({})

  const baseRules: Rule[] = [
    { required: true, message: [t('common.form.required'), '${label}'].join(' ') }
  ]

  function onFormFinish(values: IBankAccountFromValues): void {
    console.log({ formValues: values })
    const bankSelected: IBankOptionData = bankOptionsHash[values.bankName]
    onSubmit?.({ ...initialValues, ...values, bankFullName: bankSelected?.bankFullName })
  }

  function onFormChange(values: IBankAccountFromValues): void {
    setFormValues(values)
  }

  return (
    <div className={styles.form}>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onValuesChange={onFormChange}
        onFinish={onFormFinish}
      >
        <Row className="" gutter={[20, 0]}>
          <Col sm={24} xs={24}>
            <HighlightLabel
              className={styles.highlightLabel}
              title={t('bankAccount.form.userInfo')}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bankAccount.form.fullName')}
              name="fullName"
              rules={[...baseRules]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bankAccount.form.citizenNo')}
              name="citizenNo"
              rules={[
                ...baseRules,
                {
                  min: 13,
                  message: `${t('common.form.invalid.head')} ${'${label}'} ${t(
                    'common.form.invalid.tail'
                  )}`
                }
              ]}
            >
              <Input maxLength={13} />
            </Form.Item>
          </Col>
          <Col sm={24} xs={24}>
            <HighlightLabel
              className={styles.highlightLabel}
              title={t('bankAccount.form.bankAccountInfo')}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bankAccount.form.bankName')}
              name="bankName"
              rules={[...baseRules]}
            >
              <Select
                filterOption={(value: string, options: DefaultOptionType): boolean =>
                  `${options.value}`.includes(value)
                }
                allowClear
                autoClearSearchValue
              >
                {bankOptions.map((option: DefaultOptionType) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bankAccount.form.bankAccountNo')}
              name="bankAccountNo"
              rules={[...baseRules]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bankAccount.form.bankAccountName')}
              name="bankAccountName"
              rules={[...baseRules]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

BankAccountFrom.defaultProps = {
  initialValues: {}
}

export default BankAccountFrom
