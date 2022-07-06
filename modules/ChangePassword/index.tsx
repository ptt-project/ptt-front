import React, { useState } from 'react'
import { Button, Col, Form, Input, notification, Row, Space, Typography } from 'antd'
import { FormInstance, Rule, RuleObject, RuleRender } from 'antd/lib/form'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import t from '~/locales'
import styles from './ChangePassword.module.scss'
import OtpModal from '~/components/main/OtpModal'
import { IOtpData } from '~/model/Common'
import { CustomUrl } from '~/utils/main'
import { RegExpList } from '~/constants'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'

const { Text } = Typography
const user: any = {
  mobileNo: '0901234567'
}
interface IChangePasswordFormValues {
  password: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePassword: React.FC = () => {
  const router: NextRouter = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [form] = Form.useForm<IChangePasswordFormValues>()
  const [formValues, setFormValues] = useState<IChangePasswordFormValues>()

  const passwordFormatInValid: string = t('auth.changePassword.error.passwordFormatInValid')
  const confirmPasswordNotMatchedMessage: string = t(
    'auth.changePassword.error.confirmPasswordNotMatched'
  )

  function onSubmit(values: IChangePasswordFormValues): void {
    setFormValues(values)
    setIsOpen(true)
  }

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onSubmitOtp(otpData: IOtpData): void {
    try {
      console.log({ otpData, formValues })
      notification.success({
        message: 'Change Password Success'
      })
      router.replace('/auth/login', '/auth/login', {
        locale: router.locale
      })
      // success goto login
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  const validatePasswordFormat: RuleRender = (): RuleObject => ({
    validator(_: Rule, value: string): Promise<void> {
      if (!value || RegExpList.CHECK_PASSWORD.test(value)) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(passwordFormatInValid))
    }
  })

  const validateConfirmPasswordMatched: RuleRender = ({
    getFieldValue
  }: FormInstance): RuleObject => ({
    validator(_: Rule, confirmNewPassword: string): Promise<void> {
      const newPassword: string = getFieldValue('newPassword')
      if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
        return Promise.reject(confirmPasswordNotMatchedMessage)
      }
      return Promise.resolve()
    }
  })

  const baseRules: Rule[] = [
    {
      required: true,
      message: 'Required'
    },
    validatePasswordFormat
  ]

  return (
    <main className="main account">
      <Helmet>
        <title>
          {t('meta.title')} | {t('auth.changePassword.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('auth.changePassword.breadcrumbs.setting') },
          { title: t('auth.changePassword.breadcrumbs.account') },
          {
            title: t('auth.changePassword.breadcrumbs.changePassword'),
            href: CustomUrl.href('/settings/account/password', router.locale)
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
              md={24}
            >
              <Row className={`${styles.page}`}>
                <Col className="mb-4" span={24}>
                  <Text className={styles.title} type="secondary">
                    <h4>{t('auth.changePassword.title')}</h4>
                  </Text>
                </Col>
                <Form layout="vertical" form={form} onFinish={onSubmit} requiredMark={false}>
                  <Form.Item
                    label={t('auth.changePassword.password')}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Required'
                      }
                    ]}
                  >
                    <Input.Password maxLength={20} />
                  </Form.Item>
                  <Form.Item
                    label={t('auth.changePassword.newPassword')}
                    name="newPassword"
                    rules={[...baseRules]}
                  >
                    <Input.Password maxLength={20} />
                  </Form.Item>
                  <Form.Item
                    label={t('auth.changePassword.confirmNewPassword')}
                    name="confirmNewPassword"
                    dependencies={['newPassword']}
                    rules={[...baseRules, validateConfirmPasswordMatched]}
                  >
                    <Input.Password maxLength={20} />
                  </Form.Item>
                  <Space />
                  <Form.Item>
                    <Text className={styles.description}>
                      {t('auth.changePassword.description')}
                    </Text>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block>
                      {t('auth.changePassword.button.submit')}
                    </Button>
                  </Form.Item>
                </Form>

                <OtpModal
                  mobileNo={user.mobileNo}
                  isOpen={isOpen}
                  toggle={toggle}
                  onSubmit={onSubmitOtp}
                />
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default ChangePassword
