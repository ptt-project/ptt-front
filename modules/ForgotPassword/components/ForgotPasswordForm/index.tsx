import React, { useState, FC } from 'react'
import { Typography, Button, Row, Col, Image, Form, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import t from '~/locales'
import { RegExpList } from '~/constants'
import { IFieldData } from '~/model/Common'
import { IForgotPasswordForm } from '~/model/Auth'
import styles from './ForgotPasswordForm.module.scss'

const { Title } = Typography

interface IForgotPasswordFormProps {
  onSubmit: (values: IForgotPasswordForm) => void
}

const ForgotPasswordForm: FC<IForgotPasswordFormProps> = (props: IForgotPasswordFormProps) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<IForgotPasswordForm>({ emailOrMobileNo: '' })
  const requiredEmailOrMobileNo: string = `${t('common.form.required')} ${t(
    'auth.forgotPassword.form.emailOrMobileNo'
  )}` // prevent error hook rules
  const invalidEmailOrMobileNo: string = `${t('common.form.invalid.head')} ${t(
    'auth.forgotPassword.form.emailOrMobileNo'
  )} ${t('common.form.invalid.tail')}` // prevent error hook rules

  function onChangeFields(_: IFieldData[], allFields: IFieldData[]): void {
    if (_.length) {
      const tempFormData: IForgotPasswordForm = { ...formData }
      tempFormData[_[0].name[0]] = _[0].value
      setFormData(tempFormData)
    }
  }

  function onSubmit(values: IForgotPasswordForm): void {
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
                width="100%"
                src="./images/main/buyer/forgot-password.png"
                alt="forgot-password"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Title className="hps-title" level={4}>
              {t('auth.forgotPassword.title')}
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
                    label={t('auth.forgotPassword.form.emailOrMobileNo')}
                    name="emailOrMobileNo"
                    rules={[
                      { required: true, message: requiredEmailOrMobileNo },
                      (): any => ({
                        validator(_: Rule, value: string): Promise<any> {
                          const isValidEmail: boolean =
                            value && value.match(RegExpList.CHECK_EMAIL) !== null
                          const isValidMobileNo: boolean =
                            value &&
                            value.length === 10 &&
                            value.replace(RegExpList.ALLOW_NUMBER, '').length === 10
                          if (!value || isValidEmail || isValidMobileNo) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error(invalidEmailOrMobileNo))
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
                      {t('common.next')}
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
