/* eslint-disable no-template-curly-in-string */
import React, { useMemo, useState } from 'react'
import { Form, FormInstance, Col, Row, Select } from 'antd'
import { DeepPartial } from 'redux'
import { DefaultOptionType } from 'antd/lib/select'
import { Rule } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import { NumberFormatValues } from 'react-number-format'
import styles from './BankAccountFrom.module.scss'
import HighlightLabel from '~/components/main/HighlightLabel'
import { IBankAccountFromValues, IConfigOptionBank } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import CustomInput from '~/components/main/CustomInput'
import InputNumberFormat from '~/components/main/InputNumberFormat'
import { ConfigService } from '~/services'

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

  const { data: configOptions } = ConfigService.useGetConfigOptions()

  const baseRules: Rule[] = [
    { required: true, message: [t('common:form.required'), '${label}'].join(' ') }
  ]

  const bankOptions: DefaultOptionType[] = useMemo(() => {
    if (configOptions?.bank?.length) {
      return configOptions?.bank.map((d: IConfigOptionBank): DefaultOptionType => {
        return {
          label: d.labelTh,
          value: d.value
        }
      })
    }
    return []
  }, [])

  function onFormFinish(values: IBankAccountFromValues): void {
    onSubmit?.({ ...initialValues, ...values })
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
              name="thaiId"
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
              name="accountNumber"
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
              name="accountHolder"
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
