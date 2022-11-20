import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '~/components/main/Loading'
import styles from './AccountAddMobile.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Form, Input, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import {
  IOtpRequestPayload,
  IOtp,
  IApiResponse,
  IMemberMobile,
  IUpdateMemberMobilePayload
} from '~/interfaces'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { MemberService, OtpService } from '~/services'
import { OtpTypeEnum } from '~/enums'
import { AxiosError } from 'axios'

const { Text, Title } = Typography

interface IAccountAddMobileProps {
  isSeller?: boolean
  mobile: IMemberMobile
}

interface IAccountAddMobileForm {
  mobileNo: string
  otp: string
}

const AccountAddMobile: FC<IAccountAddMobileProps> = (props: IAccountAddMobileProps) => {
  const router: NextRouter = useRouter()
  const rootMenu: string = props.isSeller ? '/seller' : ''
  const prefixMenu: string = props.isSeller ? 'management/account' : 'account/info'
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info', 'setting-sidebar'])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentMobileNo, setCurrentMobileNo] = useState<string>('')
  const [timer, setTimer] = useState<number>(0)
  const [otpData, setOtpData] = useState<IOtp>({
    otpCode: '',
    refCode: '',
    reference: ''
  })

  function onChangeNumber(e: ChangeEvent<HTMLInputElement>, name: 'mobileNo' | 'otp'): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldValue(name, e.target.value)

      if (name === 'mobileNo') {
        setCurrentMobileNo(e.target.value)
      }
    } else {
      form.setFieldValue(name, e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))

      if (name === 'mobileNo') {
        setCurrentMobileNo(e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
      }
    }
  }

  async function onRequestOtp(): Promise<void> {
    try {
      setIsLoading(true)

      const payload: IOtpRequestPayload = {
        reference: form.getFieldValue('mobileNo'),
        type: OtpTypeEnum.ADD_PHONE
      }

      const { data }: IApiResponse = await OtpService.requestOtp(payload)

      setOtpData(data)
      setTimer(1.5 * 60 * 1000)

      message.success(t('common:apiMessage.success'))
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          case 102006:
            message.error(t('common:apiMessage.error'))
            break
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(values: IAccountAddMobileForm): Promise<void> {
    if (!values.otp) {
      return
    }

    try {
      setIsLoading(true)

      const payload: IUpdateMemberMobilePayload = {
        mobile: values.mobileNo,
        otpCode: values.otp,
        refCode: otpData.refCode
      }

      await MemberService.createMobile(payload)

      message.success(t('common:apiMessage.success'))
      router.push(`${rootMenu}/settings/${prefixMenu}/mobile`)
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  function renderTimer(): string {
    if (timer) {
      const min: number = Math.floor(timer / 60000)
      const sec: string = ((timer % 60000) / 1000).toFixed(0)

      return ` (${min}:${parseInt(sec) < 10 ? '0' : ''}${sec})`
    }

    return ''
  }

  useEffect(() => {
    const countDown: any = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1000)
      }
      if (timer === 0) {
        clearInterval(countDown)
      }
    }, 1000)

    return (): void => {
      clearInterval(countDown)
    }
  }, [timer])

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('account-info:mobile.titleAdd')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={
          props.isSeller
            ? [
                { title: t('setting-sidebar:seller.management.title') },
                {
                  title: t('setting-sidebar:seller.management.account'),
                  href: `${rootMenu}/settings/${prefixMenu}`
                },
                {
                  title: t('account-info:mobile.titleEdit'),
                  href: `${rootMenu}/settings/${prefixMenu}/mobile`
                },
                { title: t('account-info:mobile.titleAdd') }
              ]
            : [
                { title: t('account-info:setting') },
                { title: t('account-info:title') },
                {
                  title: t('account-info:personalInfo'),
                  href: `${rootMenu}/settings/${prefixMenu}`
                },
                {
                  title: t('account-info:mobile.titleEdit'),
                  href: `${rootMenu}/settings/${prefixMenu}/mobile`
                },
                { title: t('account-info:mobile.titleAdd') }
              ]
        }
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('account-info:mobile.titleAdd')}
              </Title>
              <Form layout="vertical" form={form} name="accountAddMobileForm" onFinish={onSubmit}>
                <Row>
                  <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label={t('account-info:mobile.newPhone')}
                          name="mobileNo"
                          rules={[
                            {
                              required: false,
                              message: `${t('common:form.required')} ${t(
                                'account-info:mobile.newPhone'
                              )}`
                            },
                            {
                              min: 10,
                              message: `${t('common:form.min.head')} 10 ${t(
                                'common:form.min.tail'
                              )}`
                            }
                          ]}
                        >
                          <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                              onChangeNumber(e, 'mobileNo')
                            }
                            maxLength={10}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Button
                          className={styles.textSecondary}
                          disabled={timer > 0 || currentMobileNo.length !== 10}
                          onClick={onRequestOtp}
                          block
                        >
                          {!timer
                            ? t('account-info:button.sendVerificationCode')
                            : `${t(
                                'account-info:button.sendVerificationCodeAgain'
                              )}${renderTimer()}`}
                        </Button>
                      </Col>
                      {timer > 0 ? (
                        <Col span={24} className="mb-2">
                          <Text type="secondary" className="hps-text-small">
                            {t('account-info:mobile.msgConfirm')} {props.mobile.mobile}
                          </Text>
                        </Col>
                      ) : (
                        ''
                      )}
                      <Col span={24}>
                        <div className={styles.label}>
                          <div className={styles.left}>
                            <Text className={styles.required}>*</Text>
                            <Text>
                              {t('account-info:mobile.otp')} {otpData.otpCode}
                            </Text>
                          </div>
                          <div className={styles.right}>
                            <Text type="secondary">
                              {otpData.refCode ? `${t('otp-modal:ref')} ${otpData.refCode}` : ''}
                            </Text>
                          </div>
                        </div>
                        <Form.Item
                          name="otp"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'account-info:mobile.otp'
                              )}`
                            },
                            {
                              min: 6,
                              message: `${t('common:form.required')} ${t(
                                'account-info:mobile.otp'
                              )}`
                            }
                          ]}
                        >
                          <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                              onChangeNumber(e, 'otp')
                            }
                            maxLength={6}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('account-info:button.addPhone')}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
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

export default AccountAddMobile
