import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { IMemberMobile, IOtpRequestPayload, IOtp, IApiResponse } from '~/interfaces'
import Loading from '~/components/main/Loading'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { MemberService, OtpService } from '~/services'
import { OtpTypeEnum } from '~/enums'
import styles from './ProfilePhone.module.scss'

const { Text, Title } = Typography
const AddPhone: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCheckButtonSendCode, setIsCheckButtonSendCode] = useState<boolean>(true)
  const [dataMobile, setMobile] = useState<string>('')
  const [otpData, setOtpData] = useState<IOtp>({
    otpCode: '',
    refCode: '',
    reference: ''
  })
  const [timer, setTimer] = useState<number>(0)
  const [msgSendOTP, setMsgSendOTP] = useState<string>('')
  const [otpInput, setOtpInput] = useState<string>('')
  const router: NextRouter = useRouter()

  async function onSubmit(): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IMemberMobile = {
        mobile: dataMobile,
        otpCode: otpInput,
        refCode: otpData.refCode
      }
      await MemberService.createMobile(payload)
      isSuccess = true
      router.push('/settings/account/info/phone', '/settings/account/info/phone', {
        locale: router.locale
      })
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  function onCheckMobile(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.value.length === 10) {
      setMobile(event.target.value)
      setIsCheckButtonSendCode(false)
    }
  }

  async function onRequestOtp(): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IOtpRequestPayload = {
        reference: dataMobile,
        type: OtpTypeEnum.ADD_PHONE
      }
      const { data }: IApiResponse = await OtpService.requestOtp(payload)
      setOtpData({ ...data, otpCode: data.otpCode || '' })
      console.log(data.otpCode)
      setTimer(1.5 * 60 * 1000)
      setMsgSendOTP(`${t('account-info:phone.msgConfirm')} ${dataMobile}`)
      isSuccess = true
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  function renderTimer(): string {
    if (timer) {
      const min: number = Math.floor(timer / 60000)
      const sec: string = ((timer % 60000) / 1000).toFixed(0)
      return ` (${min}:${parseInt(sec) < 10 ? '0' : ''}${sec})`
    }
    return ''
  }

  function onChangeOtp(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      setOtpInput(e.target.value)
    } else {
      setOtpInput(e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
    }
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
          {t('common:meta.title')} | {t('account-info:phone.titleAdd')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('account-info:setting') },
          { title: t('account-info:title') },
          { title: t('account-info:personalInfo'), href: '/settings/account/info' },
          { title: t('account-info:phone.titleEdit'), href: '/settings/account/info/phone' },
          { title: t('account-info:phone.titleAdd'), href: '/settings/account/info/add-phone' }
        ]}
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('account-info:phone.titleAdd')}
              </Title>
              <Form layout="vertical">
                <Row>
                  <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label={t('account-info:phone.newPhone')}
                          name="mobile"
                          rules={[
                            {
                              min: 10
                            }
                          ]}
                        >
                          <Input onChange={onCheckMobile} maxLength={10} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            className={styles.textSecondary}
                            disabled={timer > 0 || isCheckButtonSendCode}
                            onClick={onRequestOtp}
                            block
                          >
                            {!timer
                              ? t('account-info:button.sendVerificationCode')
                              : `${t(
                                  'account-info:button.sendVerificationCodeAgain'
                                )}${renderTimer()}`}
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={24} className="mb-2">
                        <Text type="secondary">{msgSendOTP}</Text>
                      </Col>
                      <Col span={24}>
                        <div className={styles.label}>
                          <div className={styles.left}>
                            <Text className={styles.required}>*</Text>
                            <Text>{t('account-info:phone.otp')}</Text>
                          </div>
                          <div className={styles.right}>
                            <Text type="secondary">
                              {otpData.refCode ? `${t('otp-modal:ref')} ${otpData.refCode}` : ''}
                            </Text>
                          </div>
                        </div>
                        <Form.Item name="otpCode">
                          <Input maxLength={6} onChange={onChangeOtp} value={otpInput} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button
                            type="primary"
                            block
                            onClick={onSubmit}
                            disabled={otpInput.length !== 6}
                          >
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

export default AddPhone
