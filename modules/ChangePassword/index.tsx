import React, { useState } from 'react'
import { Button, Col, Form, Input, notification, Row, Space, Typography } from 'antd'
import { FormInstance, Rule, RuleObject, RuleRender } from 'antd/lib/form'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import OtpModal from '~/components/main/OtpModal'
import { IOtpData } from '~/interfaces'
import { CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'

const { Text, Title } = Typography
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
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register', 'change-password'])

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [form] = Form.useForm<IChangePasswordFormValues>()
  const [formValues, setFormValues] = useState<IChangePasswordFormValues>()

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
      // success go to login
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  const validatePasswordFormat: RuleRender = (): RuleObject => ({
    validator(_: Rule, value: string): Promise<void> {
      if (!value || RegExpConst.CHECK_PASSWORD.test(value)) {
        return Promise.resolve()
      }
      return Promise.reject(
        new Error(
          `${t('common:form.invalid.head')} ${t('change-password:newPassword')} ${t(
            'common:form.invalid.tail'
          )}`
        )
      )
    }
  })

  const validateConfirmPasswordMatched: RuleRender = ({
    getFieldValue
  }: FormInstance): RuleObject => ({
    validator(_: Rule, confirmNewPassword: string): Promise<void> {
      const newPassword: string = getFieldValue('newPassword')
      if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
        return Promise.reject(
          new Error(`${t('change-password:confirmNewPassword')} ${t('common:form.notMatch')}`)
        )
      }
      return Promise.resolve()
    }
  })

  const baseRules: Rule[] = [
    {
      required: true,
      message: `${t('common:form.required')} ${t('change-password:newPassword')}`
    },
    validatePasswordFormat
  ]

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('change-password:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('change-password:breadcrumbs.setting') },
          { title: t('change-password:breadcrumbs.account') },
          {
            title: t('change-password:breadcrumbs.changePassword'),
            href: CustomUrlUtil('/settings/account/password', router.locale)
          }
        ]}
      />
      <OtpModal mobile={user.mobileNo} isOpen={isOpen} toggle={toggle} onSubmit={onSubmitOtp} />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col
              className="mx-auto"
              lg={{ span: 8, offset: 8 }}
              md={{ span: 12, offset: 6 }}
              sm={24}
            >
              <Row>
                <Col span={24}>
                  <Title className="hps-title" level={4}>
                    {t('change-password:title')}
                  </Title>
                </Col>
                <Col span={24}>
                  <Form layout="vertical" form={form} onFinish={onSubmit} requiredMark={false}>
                    <Form.Item
                      label={t('change-password:password')}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t('change-password:password')}`
                        }
                      ]}
                    >
                      <Input.Password maxLength={20} />
                    </Form.Item>
                    <Form.Item
                      label={t('change-password:newPassword')}
                      name="newPassword"
                      rules={[...baseRules]}
                    >
                      <Input.Password maxLength={20} />
                    </Form.Item>
                    <Form.Item
                      label={t('change-password:confirmNewPassword')}
                      name="confirmNewPassword"
                      dependencies={['newPassword']}
                      rules={[...baseRules, validateConfirmPasswordMatched]}
                    >
                      <Input.Password maxLength={20} />
                    </Form.Item>
                    <Space />
                    <Form.Item>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('auth.register:form.passwordHintA')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('auth.register:form.passwordHintB')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('auth.register:form.passwordHintC')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('auth.register:form.passwordHintD')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('auth.register:form.passwordHintE')}
                      </Text>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large" block>
                        {t('common:confirm')}
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default ChangePassword
