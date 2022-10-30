import React, { useState, FC } from 'react'
import styles from './ForgotPasswordForm.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Image, Form, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IAuthForgotPasswordForm, IFieldData } from '~/interfaces'

const { Title } = Typography

interface IForgotPasswordFormProps {
  onSubmit: (values: IAuthForgotPasswordForm) => void
}

const ForgotPasswordForm: FC<IForgotPasswordFormProps> = (props: IForgotPasswordFormProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<IAuthForgotPasswordForm>({ reference: '' })

  function onChangeFields(_: IFieldData[], allFields: IFieldData[]): void {
    if (_.length) {
      const tempFormData: IAuthForgotPasswordForm = { ...formData }
      tempFormData[_[0].name[0]] = _[0].value
      setFormData(tempFormData)
    }
  }

  function onSubmit(values: IAuthForgotPasswordForm): void {
    props.onSubmit(values)
  }

  return (
    <div className="page-content mb-9">
      <div className="container">
        <Row gutter={48}>
          <Col xl={6} lg={0}>
            <div className={styles.imgContainer}>
              <Image
                rootClassName={styles.imgWrapper}
                preview={false}
                src="./images/main/buyer/forgot-password.png"
                alt="forgot-password"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Title className="hps-title" level={4}>
              {t('auth.forgot-password:title')}
            </Title>
            <Form
              layout="vertical"
              name="forgotPasswordForm"
              form={form}
              onFieldsChange={onChangeFields}
              onFinish={onSubmit}
            >
              <Row>
                <Col md={{ span: 12, offset: 6 }} xs={24}>
                  <Form.Item
                    label={t('auth.forgot-password:form.reference')}
                    name="reference"
                    rules={[
                      {
                        required: true,
                        message: `${t('common:form.required')} ${t(
                          'auth.forgot-password:form.reference'
                        )}`
                      },
                      (): any => ({
                        validator(_: Rule, value: string): Promise<any> {
                          const isValidEmail: boolean =
                            value && value.match(RegExpConst.CHECK_EMAIL) !== null
                          const isValidMobile: boolean =
                            value &&
                            value.length === 10 &&
                            value.replace(RegExpConst.ALLOW_NUMBER, '').length === 10
                          if (!value || isValidEmail || isValidMobile) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error(
                              `${t('common:form.invalid.head')} ${t(
                                'auth.forgot-password:form.reference'
                              )} ${t('common:form.invalid.tail')}`
                            )
                          )
                        }
                      })
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={{ span: 12, offset: 6 }} xs={24}>
                  <Form.Item>
                    <Button htmlType="submit" type="primary" block>
                      {t('common:next')}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
