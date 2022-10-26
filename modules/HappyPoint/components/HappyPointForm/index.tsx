/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable no-template-curly-in-string */
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { Form, FormInstance, Col, Row, DatePicker, Typography, Divider, Space, Alert } from 'antd'
import { DeepPartial } from 'redux'
import { Rule, RuleObject, RuleRender } from 'antd/lib/form'
import { useTranslation } from 'next-i18next'
import moment from 'moment'
import { NextRouter, useRouter } from 'next/router'
import { NumberFormatValues } from 'react-number-format'
import styles from './HappyPointForm.module.scss'
import { IHappyPointFormValues } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import CustomInput from '~/components/main/CustomInput'
import { HappyPointTypeEnum } from '~/enums'
import { CustomUrlUtil, HelperDecimalFormatUtil } from '~/utils/main'
import InputNumberFormat from '~/components/main/InputNumberFormat'
import { getSummarySellHappyPoint, getSummaryTransferHappyPoint } from './happy-point.helper'

const { Text, Link } = Typography

interface IHappyPointFormProps {
  parentForm: FormInstance
  formType: HappyPointTypeEnum
  initialValues?: Partial<IHappyPointFormValues>
  happyPointBalance: number
  eWalletBalance: number
  rateBahtPerHappyPoint: number
  onSubmit: (values: IHappyPointFormValues) => void
}

const HappyPointForm: React.FC<IHappyPointFormProps> = (props: IHappyPointFormProps) => {
  const {
    parentForm,
    formType,
    initialValues,
    happyPointBalance,
    eWalletBalance,
    rateBahtPerHappyPoint,
    onSubmit
  } = props

  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'happy-point'])
  const [form] = Form.useForm(parentForm)
  const [, /* formValues */ setFormValues] = useState<DeepPartial<IHappyPointFormValues>>({})

  const baseRules: Rule[] = [
    { required: true, message: [t('common:form.required'), '${label}'].join(' ') }
  ]

  function onFormFinish(values: IHappyPointFormValues): void {
    console.log({ formValues: values })
    onSubmit?.({ ...initialValues, ...values })
  }

  function onFormChange(values: IHappyPointFormValues): void {
    setFormValues(values)
  }

  const amountLabel: string = useMemo(() => {
    switch (formType) {
      case HappyPointTypeEnum.BUY:
        return t('happy-point:buy.title')
      case HappyPointTypeEnum.SELL:
        return t('happy-point:sell.title')
      case HappyPointTypeEnum.TRANSFER:
        return t('happy-point:transfer.title')
      default:
        return ''
    }
  }, [formType, t])

  const validateHappyPointAmount: RuleRender = useCallback((): RuleObject => {
    switch (formType) {
      case HappyPointTypeEnum.BUY:
        return {
          validator(_: Rule, value: number): Promise<void> {
            const happyPointAmount = Number(value)
            const totalBuyAmount: number = happyPointAmount * rateBahtPerHappyPoint
            if (Number(totalBuyAmount) <= eWalletBalance) {
              return Promise.resolve()
            }
            return Promise.reject(new Error())
          }
        }
      case HappyPointTypeEnum.SELL:
      case HappyPointTypeEnum.TRANSFER:
        return {
          validator(_: Rule, value: number): Promise<void> {
            const happyPointAmount = Number(value)
            if (happyPointAmount <= happyPointBalance) {
              return Promise.resolve()
            }
            return Promise.reject(new Error())
          }
        }
      default:
        return {}
    }
  }, [eWalletBalance, formType, happyPointBalance, rateBahtPerHappyPoint])

  const renderAlert = useCallback((): ReactNode => {
    const values: IHappyPointFormValues = form.getFieldsValue()
    const { happyPointAmount } = values
    const totalBuyAmount: number = happyPointAmount * rateBahtPerHappyPoint

    switch (formType) {
      case HappyPointTypeEnum.BUY:
        if (totalBuyAmount > eWalletBalance) {
          return (
            <div className="mb-4">
              <Alert
                message={t('happy-point:buy.eWalletNotEnough.title')}
                description={
                  <Row>
                    <Text>
                      {`${t('happy-point:buy.eWalletNotEnough.description')} > `}
                      <Link
                        href={CustomUrlUtil('/settings/finance/e-wallet', router.locale)}
                        underline
                      >
                        {t('happy-point:buy.eWalletNotEnough.eWalletLink')}
                      </Link>
                    </Text>
                  </Row>
                }
                type="warning"
                showIcon
              />
            </div>
          )
        }
        return null
      case HappyPointTypeEnum.SELL:
        return (
          <div className="mb-4">
            <Alert message={t('happy-point:sell.sellProcessInfo.title')} type="info" showIcon />
          </div>
        )
      case HappyPointTypeEnum.TRANSFER:
      default:
        return null
    }
  }, [eWalletBalance, form, formType, rateBahtPerHappyPoint, router.locale, t])

  return (
    <div className={styles.form}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ ...initialValues, date: moment() }}
        onValuesChange={onFormChange}
        onFinish={onFormFinish}
      >
        <Row gutter={[20, 0]}>
          <Col span={24}>
            <Form.Item shouldUpdate noStyle>
              {renderAlert}
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item label={t('happy-point:form.date')} name="date">
              <DatePicker className="w-100" format="DD/MM/yyyy" disabled />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              className={styles.customFormLabel}
              label={
                <Row className="w-100" justify="space-between">
                  <Col>{amountLabel}</Col>
                  <Col>
                    <Text className={styles.eWalletBalance}>
                      {t('happy-point:form.eWalletBalance', {
                        amount: HelperDecimalFormatUtil(eWalletBalance, 2, 'th-TH', {
                          style: 'currency',
                          currency: 'THB'
                        })
                      })}
                    </Text>
                  </Col>
                </Row>
              }
              help={
                formType !== HappyPointTypeEnum.TRANSFER ? (
                  <Text className={styles.amountHelp}>
                    {t('happy-point:form.amountRateDescription', {
                      rateBahtPerHappyPoint
                    })}
                  </Text>
                ) : null
              }
              name="happyPointAmount"
              rules={[...baseRules, validateHappyPointAmount]}
            >
              <InputNumberFormat
                isAllowed={(values: NumberFormatValues): boolean => {
                  const { floatValue } = values
                  if (formType === HappyPointTypeEnum.BUY) {
                    return true
                  }
                  return (floatValue || 0) <= happyPointBalance
                }}
                isNumericString
                allowEmptyFormatting
                allowNegative={false}
                thousandSeparator
                decimalScale={2}
                // suffix={
                //   <Text className={styles.balanceUnit}>{t('happy-point:common.happyPoint')}</Text>
                // }
              />
            </Form.Item>
          </Col>
          {formType === HappyPointTypeEnum.TRANSFER ? (
            <Col sm={12} xs={24}>
              <Form.Item
                label={t('happy-point:form.receiverCode')}
                name="receiverCode"
                rules={[...baseRules]}
              >
                <CustomInput minLength={20} maxLength={20} />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        <Divider className={`${styles.divider}`} />
        <Row className="mt-5">
          <Col
            sm={{
              offset: 12,
              span: 12
            }}
            xs={{
              offset: 4,
              span: 20
            }}
          >
            {formType === HappyPointTypeEnum.BUY && (
              <Form.Item shouldUpdate>
                {(): ReactNode => {
                  const values: IHappyPointFormValues = form.getFieldsValue()
                  const { happyPointAmount } = values
                  const totalAmount: number = happyPointAmount * rateBahtPerHappyPoint
                  return (
                    <Space className="w-100" size={8} direction="vertical">
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.totalAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(totalAmount)} ${t(
                          'common:unit.baht'
                        )}`}</Text>
                      </Row>
                    </Space>
                  )
                }}
              </Form.Item>
            )}
            {formType === HappyPointTypeEnum.SELL && (
              <Form.Item shouldUpdate>
                {(): ReactNode => {
                  const values: IHappyPointFormValues = form.getFieldsValue()
                  const { happyPointAmount } = values
                  const { bahtAmount, vatAmount, totalAmount } = getSummarySellHappyPoint(
                    happyPointAmount,
                    rateBahtPerHappyPoint
                  )

                  return (
                    <Space className="w-100" size={8} direction="vertical">
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.bahtAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(bahtAmount)} ${t(
                          'common:unit.baht'
                        )}`}</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.vatAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(vatAmount)} ${t(
                          'common:unit.baht'
                        )}`}</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.totalAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(totalAmount)} ${t(
                          'common:unit.baht'
                        )}`}</Text>
                      </Row>
                    </Space>
                  )
                }}
              </Form.Item>
            )}
            {formType === HappyPointTypeEnum.TRANSFER && (
              <Form.Item shouldUpdate>
                {(): ReactNode => {
                  const values: IHappyPointFormValues = form.getFieldsValue()
                  const { happyPointAmount } = values
                  const { feePoint, totalPoint } = getSummaryTransferHappyPoint(happyPointAmount)

                  return (
                    <Space className="w-100" size={8} direction="vertical">
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.happyPointAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(happyPointAmount)}`}</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.vatAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(feePoint)}`}</Text>
                      </Row>
                      <Row justify="space-between">
                        <Text>{t('happy-point:form.totalAmount')}</Text>
                        <Text>{`${HelperDecimalFormatUtil(totalPoint)}`}</Text>
                      </Row>
                    </Space>
                  )
                }}
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

HappyPointForm.defaultProps = {
  initialValues: {}
}

export default HappyPointForm
