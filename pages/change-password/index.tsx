import React, { useCallback, useMemo, useState } from 'react'
import { Button, Form, FormItemProps, Input } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import t from '~/locales'

interface IChangePasswordFromValues {
  password: string
  newPassword: string
  confirmNewPassword: string
}

const InputPassword: React.FC<FormItemProps> = (props: FormItemProps) => {
  const { label, name, rules } = props

  const [hidePassword, setHidePassword] = useState(false)

  const onHideIconClick: VoidFunction = useCallback(() => {
    setHidePassword((prev: boolean) => !prev)
  }, [])

  const SuffixIcon: typeof EyeInvisibleOutlined = useMemo(
    () => (hidePassword ? EyeInvisibleOutlined : EyeOutlined),
    [hidePassword]
  )

  return (
    <Form.Item label={label} name={name} rules={rules} requiredMark>
      <Input
        suffix={<SuffixIcon className="site-form-item-icon" onClick={onHideIconClick} />}
        type={hidePassword ? 'password' : 'text'}
      />
    </Form.Item>
  )
}

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm<IChangePasswordFromValues>()
  return (
    <div className="container change-password">
      <div className="content">
        <h2 className="title title-center mb-10">{t('auth.changePassword.title')}</h2>
        <div>
          <Form
            layout="vertical"
            form={form}
            // initialValues={{ layout: formLayout }}
          >
            <InputPassword
              label={t('auth.changePassword.password')}
              name="password"
              rules={[
                {
                  type: 'string',
                  min: 8,
                  max: 20,
                  message: t('auth.changePassword.error.passwordFormatInValid')
                }
              ]}
              requiredMark
            />
            <InputPassword
              label={t('auth.changePassword.newPassword')}
              name="newPassword"
              rules={[
                {
                  type: 'string',
                  min: 8,
                  max: 20,
                  message: t('auth.changePassword.error.passwordFormatInValid')
                }
              ]}
              requiredMark
            />
            <InputPassword
              label={t('auth.changePassword.confirmNewPassword')}
              name="confirmNewPassword"
              rules={[
                {
                  type: 'string',
                  min: 8,
                  max: 20,
                  message: t('auth.changePassword.error.passwordFormatInValid')
                }
              ]}
              requiredMark
            />
            <Form.Item noStyle>
              <p className="">{t('auth.changePassword.description')}</p>
            </Form.Item>
            <Form.Item noStyle>
              <Button className="btn btn-submit" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
