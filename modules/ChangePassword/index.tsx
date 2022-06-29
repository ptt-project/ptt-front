import React, { useCallback, useState } from 'react'
import { Button, Form, FormItemProps, Input, Space, Typography } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { FormInstance, Rule, RuleObject, RuleRender } from 'antd/lib/form'
import t from '~/locales'
import styles from './ChangePassword.module.scss'

const { Text } = Typography

interface IChangePasswordFieldsValue {
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
  const [form] = Form.useForm<IChangePasswordFieldsValue>()

  const confirmPasswordNotMatchedMessage: string = t(
    'auth.changePassword.error.confirmPasswordNotMatched'
  )

  const onFormFinish: any = useCallback((fieldsValue: IChangePasswordFieldsValue) => {
    console.log({ formValues: fieldsValue })
  }, [])

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
        <Form layout="vertical" form={form} onFinish={onFormFinish} requiredMark={false}>
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
    </div>
  )
}

export default ChangePassword
