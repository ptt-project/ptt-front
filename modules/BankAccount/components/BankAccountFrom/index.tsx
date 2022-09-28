/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import { Form, FormInstance, Col, Row, Select } from 'antd'
import { DeepPartial } from 'redux'
import { DefaultOptionType } from 'antd/lib/select'
import { Rule } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { NumberFormatValues } from 'react-number-format'
import styles from './BankAccountFrom.module.scss'
import HighlightLabel from '~/components/main/HighlightLabel'
import { IBankOptionData, IBankAccountFromValues } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import CustomInput from '~/components/main/CustomInput'
import InputNumberFormat from '~/components/main/InputNumberFormat'
import { bankOptionsData } from '../../bank-account.helper'

const bankOptions: DefaultOptionType[] = bankOptionsData.map((d: IBankOptionData) => ({
  label: `${d.bankName} (${d.bankCode})`,
  value: d.bankCode
}))

interface IBankAccountFromProps {
  parentForm: FormInstance
  initialValues?: Partial<IBankAccountFromValues>
  onSubmit: (values: IBankAccountFromValues) => void
}

const BankAccountFrom: React.FC<IBankAccountFromProps> = (props: IBankAccountFromProps) => {
  const { parentForm, initialValues, onSubmit } = props

  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])
  const [form] = Form.useForm(parentForm)
  const [, /* formValues */ setFormValues] = useState<DeepPartial<IBankAccountFromValues>>({})

  const baseRules: Rule[] = [
    { required: true, message: [t('common:form.required'), '${label}'].join(' ') }
  ]

  function onFormFinish(values: IBankAccountFromValues): void {
    console.log({ formValues: values })

    onSubmit?.({ ...initialValues, ...values })
  }

  function onFormChange(values: IBankAccountFromValues): void {
    console.log({ formValues: values })
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
              title={t('bank-account:form.userInfo')}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bank-account:form.fullName')}
              name="fullName"
              rules={[...baseRules]}
            >
              <CustomInput onlyLetter maxLength={250} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bank-account:form.citizenNo')}
              name="citizenNo"
              rules={[
                ...baseRules,
                {
                  type: 'string',
                  min: 13,
                  message: [
                    t('common:form.invalid.head'),
                    // eslint-disable-next-line quotes
                    "'${label}'",
                    t('common:form.invalid.tail')
                  ].join(' ')
                }
              ]}
            >
              <InputNumberFormat
                format="#-####-#####-##-#"
                mask="_"
                isValueString
                isAllowed={(values: NumberFormatValues): boolean => {
                  if (values?.value) return values?.value.length <= 13
                  return true
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={24} xs={24}>
            <HighlightLabel
              className={styles.highlightLabel}
              title={t('bank-account:form.bankAccountInfo')}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bank-account:form.bankName')}
              name="bankCode"
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
              label={t('bank-account:form.bankAccountNo')}
              name="bankAccountNo"
              rules={[...baseRules]}
            >
              <InputNumberFormat
                isValueString
                isAllowed={(values: NumberFormatValues): boolean => {
                  if (values?.value) return values?.value.length <= 20
                  return true
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('bank-account:form.bankAccountName')}
              name="bankAccountName"
              rules={[...baseRules]}
            >
              <CustomInput onlyLetter maxLength={250} />
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
