/* eslint-disable no-template-curly-in-string */
import React, { ReactNode, useMemo, useState } from 'react'
import { Typography, Row, Col, Select, Form, Button, Space, Alert, Divider, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import { DefaultOptionType } from 'antd/lib/select'
import { Rule } from 'antd/lib/form'
import styles from './EWalletWithdraw.module.scss'
import { CustomUrlUtil, HelperDecimalFormatUtil, HelperCensorBankAccountNoUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import { bankMock } from '~/modules/BankAccount/mock-data'
import { IBankAccountData } from '~/interfaces'
import CustomInput from '~/components/main/CustomInput'
import OtpModal from '~/components/main/OtpModal'
import { OtpTypeEnum } from '~/enums'

const { Title, Text, Link } = Typography

interface IEWalletWithdrawFormValues {
  bankAccountNo: string
  withdrawAmount: number
}

const EWalletWithdraw: React.FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm<IEWalletWithdrawFormValues>()
  const [isOtpOpen, setIsOtpOpen] = useState<boolean>(false)
  const { t } = useTranslation([...LocaleNamespaceConst, 'e-wallet'])

  const baseRules: Rule[] = [
    { required: true, message: [t('common:form.required'), '${label}'].join(' ') }
  ]

  function toggleOtpOpen(): void {
    setIsOtpOpen(!isOtpOpen)
  }

  function onOtpSuccess(): void {
    setIsOtpOpen(false)
    message.success(t('common:dataUpdated'))
    router.replace('/settings/finance/e-wallet', '/settings/finance/e-wallet', {
      locale: router.locale
    })
  }

  function onSubmit(values: IEWalletWithdrawFormValues): void {
    console.log(values)
    setIsOtpOpen(true)
  }

  function onCancelClick(): void {
    router.back()
  }

  const myBankAccountOptions: DefaultOptionType[] = useMemo(
    () =>
      bankMock.map(
        (d: IBankAccountData): DefaultOptionType => ({
          label: `${d.bankFullName} ${HelperCensorBankAccountNoUtil(d.bankAccountNo)} ${
            d.isDefault ? `[${t('common:mainBankAccount')}]` : ''
          }`,
          value: d.bankAccountNo
        })
      ),
    [t]
  )

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('e-wallet:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('e-wallet:breadcrumbs.setting') },
          { title: t('e-wallet:breadcrumbs.finance') },
          {
            title: t('e-wallet:breadcrumbs.withdraw'),
            href: CustomUrlUtil('/settings/finance/e-wallet/withdraw', router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row className={styles.contentLayout} gutter={[24, 24]} justify="space-between">
                <Col span={24}>
                  <Title className={styles.sectionTitle} level={4}>
                    {t('e-wallet:withdraw.title')}
                  </Title>
                </Col>
                {!myBankAccountOptions?.length && (
                  <Col span={24}>
                    <Alert
                      message={t('e-wallet:withdraw.noBankAccountTitle')}
                      description={
                        <Row>
                          <Text>
                            {`${t('e-wallet:withdraw.noBankAccountDescription')} > `}
                            <Link
                              href={CustomUrlUtil('/settings/finance/bank', router.locale)}
                              underline
                            >
                              {t('e-wallet:withdraw.bankAccount')}
                            </Link>
                          </Text>
                        </Row>
                      }
                      type="warning"
                      showIcon
                      closable
                    />
                  </Col>
                )}
                <Col span={24}>
                  <Form
                    layout="vertical"
                    labelAlign="right"
                    form={form}
                    onFinish={onSubmit}
                    disabled={!myBankAccountOptions?.length}
                    requiredMark
                  >
                    <Row gutter={[20, 20]}>
                      <Col sm={12} xs={24}>
                        <Form.Item
                          name="bankAccountNo"
                          label={t('e-wallet:withdraw.selectBankAccount')}
                          rules={[...baseRules]}
                        >
                          <Select>
                            {myBankAccountOptions.map((option: DefaultOptionType) => (
                              <Select.Option key={`${option.value}`} value={option.value}>
                                {option.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col sm={12} xs={24}>
                        <Form.Item
                          name="withdrawAmount"
                          label={t('e-wallet:withdraw.withdrawAmount')}
                          help={t('e-wallet:withdraw.withdrawMinimumDescription')}
                          rules={[
                            ...baseRules,
                            {
                              validator(_: Rule, value: number): Promise<void> {
                                const withdrawAmount: number = Number(value || 0)
                                if (Number.isNaN(withdrawAmount) || !withdrawAmount) {
                                  return Promise.reject(
                                    new Error([t('common:form.required'), '${label}'].join(' '))
                                  )
                                }
                                if (withdrawAmount < 100) {
                                  return Promise.reject(
                                    new Error(t('e-wallet:withdraw.withdrawMinimumDescription'))
                                  )
                                }
                                return Promise.resolve()
                              }
                            }
                          ]}
                        >
                          <CustomInput suffix={t('common:unit.baht')} maxLength={10} onlyNumber />
                        </Form.Item>
                      </Col>
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
                        <Form.Item shouldUpdate>
                          {(): ReactNode => {
                            const values: IEWalletWithdrawFormValues = form.getFieldsValue()
                            const { withdrawAmount } = values
                            const vatAmount: number = withdrawAmount * 0.07
                            const totalAmount: number = withdrawAmount - vatAmount
                            return (
                              <Space className="w-100" size={8} direction="vertical">
                                <Row justify="space-between">
                                  <Text>{t('e-wallet:common.amount')}</Text>
                                  <Text>{`${HelperDecimalFormatUtil(withdrawAmount)} ${t(
                                    'บาท'
                                  )}`}</Text>
                                </Row>
                                <Row justify="space-between">
                                  <Text>{t('e-wallet:common.vatAmount')}</Text>
                                  <Text>{`${HelperDecimalFormatUtil(vatAmount)} ${t('บาท')}`}</Text>
                                </Row>
                                <Row justify="space-between">
                                  <Text>{t('e-wallet:common.totalAmount')}</Text>
                                  <Text>{`${HelperDecimalFormatUtil(totalAmount)} ${t(
                                    'บาท'
                                  )}`}</Text>
                                </Row>
                              </Space>
                            )
                          }}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item shouldUpdate>
                      {(): ReactNode => (
                        <Row className="mt-5" gutter={[24, 0]} align="middle">
                          <Col span={12}>
                            <Button type="text" onClick={onCancelClick} block>
                              {t('common:cancel')}
                            </Button>
                          </Col>
                          <Col span={12}>
                            <Button type="primary" htmlType="submit" block>
                              {t('common:confirm')}
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Form.Item>
                  </Form>
                  {/* TODO: wait type otp verify */}
                  <OtpModal
                    action={OtpTypeEnum.REGISTER}
                    mobile="0900000001"
                    isOpen={isOtpOpen}
                    toggle={toggleOtpOpen}
                    onSubmit={onOtpSuccess}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default EWalletWithdraw
