import React, { useState } from 'react'
import { Button, Form, FormItemProps, Input, Space, Typography } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
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

const InputPassword: React.FC<FormItemProps> = (props: FormItemProps) => {
  const { label, name, rules } = props

  const [hidePassword, setHidePassword] = useState(true)

  function onEyeIconClick(): void {
    setHidePassword((prev: boolean) => !prev)
  }

  const SuffixIcon: typeof EyeInvisibleOutlined = hidePassword ? EyeInvisibleOutlined : EyeOutlined

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input
        suffix={<SuffixIcon className="site-form-item-icon" onClick={onEyeIconClick} />}
        type={hidePassword ? 'password' : 'text'}
        maxLength={20}
      />
    </Form.Item>
  )
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
    <div className={`container ${styles.page}`}>
      <div className={styles.content}>
        <Text className={styles.title}>
          <h4>{t('auth.changePassword.title')}</h4>
        </Text>
        <Form layout="vertical" form={form} onFinish={onSubmit} requiredMark={false}>
          <InputPassword
            label={t('auth.changePassword.password')}
            name="password"
            rules={[
              {
                required: true,
                message: 'Required'
              }
            ]}
          />
          <InputPassword
            label={t('auth.changePassword.newPassword')}
            name="newPassword"
            rules={[...baseRules, validateConfirmPasswordMatched]}
          />
          <InputPassword
            label={t('auth.changePassword.confirmNewPassword')}
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[...baseRules, validateConfirmPasswordMatched]}
          />
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
      </div>
      <OtpModal mobileNo={user.mobileNo} isOpen={isOpen} toggle={toggle} onSubmit={onSubmitOtp} />
    </div>
  )
}

export default ChangePassword
