import React, { useState } from 'react'
import { Button, Col, Form, Input, notification, Row, Space, Typography } from 'antd'
import { FormInstance, Rule, RuleObject, RuleRender } from 'antd/lib/form'
import t from '~/locales'
import styles from './ChangePassword.module.scss'
import OtpModal from '~/components/main/OtpModal'
import { IOtpData } from '~/model/Common'

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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [form] = Form.useForm<IChangePasswordFormValues>()
  const [formValues, setFormValues] = useState<IChangePasswordFormValues>()

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
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

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
    {
      type: 'string',
      pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
      message: t('auth.changePassword.error.passwordFormatInValid')
    }
  ]

  return (
    <Row className={`${styles.page}`}>
      <Col span={24}>
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
          rules={[...baseRules, validateConfirmPasswordMatched]}
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
          <Text className={styles.description}>{t('auth.changePassword.description')}</Text>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            {t('auth.changePassword.button.submit')}
          </Button>
        </Form.Item>
      </Form>

      <OtpModal mobileNo={user.mobileNo} isOpen={isOpen} toggle={toggle} onSubmit={onSubmitOtp} />
    </Row>
  )
}

export default ChangePassword
