import React, { FC } from 'react'
import styles from './ForgotPasswordConfirm.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Image, Form, Input, Button, Space } from 'antd'
import { Rule } from 'antd/lib/form'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { OtpReferenceTypeEnum } from '../../../../enums'

const { Title, Text } = Typography

interface IForgotPasswordConfirmProps {
  reference: string
  referenceType: OtpReferenceTypeEnum
  onSubmit: (values: { password: string }) => void
  resetStep: () => void
}

const ForgotPasswordConfirm: FC<IForgotPasswordConfirmProps> = (
  props: IForgotPasswordConfirmProps
) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [form] = Form.useForm()

  function onSubmit(values: { password: string }): void {
    props.onSubmit(values)
  }

  return (
    <div className="page-content mb-9">
      <div className="container">
        <Row gutter={48}>
          <Col xl={6} lg={0} xs={0}>
            <div className={styles.imgContainer}>
              <Image
                rootClassName={styles.imgWrapper}
                preview={false}
                src="./images/main/buyer/forgot-password.png"
                alt="forgot-password"
              />
            </div>
          </Col>
          <Col xl={18} lg={24} xs={24}>
            <Row>
              <Col span={24}>
                <Title className="hps-title" level={4}>
                  {t('auth.forgot-password:confirm.title')}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col className={styles.referenceWrapper} span={24}>
                <Space size="large">
                  <Text>{t('auth.forgot-password:confirm.reference')}:</Text>
                  <Text className={styles.reference}>
                    {props.referenceType === OtpReferenceTypeEnum.EMAIL ? (
                      <i className="fas fa-envelope mr-2" />
                    ) : (
                      <i className="fas fa-phone-alt mr-2" />
                    )}
                    {props.reference}
                  </Text>
                  {props.referenceType === OtpReferenceTypeEnum.MOBILE ? (
                    <Text className={styles.edit} onClick={(): void => props.resetStep()}>
                      <i className="fas fa-pen" />
                    </Text>
                  ) : null}
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form layout="vertical" name="forgotPasswordForm" form={form} onFinish={onSubmit}>
                  <Row>
                    <Col lg={{ span: 10, offset: 7 }} md={{ span: 12, offset: 6 }} xs={24}>
                      <Form.Item
                        label={t('auth.forgot-password:confirm.form.password')}
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: `${t('common:form.required')} ${t(
                              'auth.forgot-password:confirm.form.password'
                            )}`
                          },
                          (): any => ({
                            validator(_: Rule, value: string): Promise<any> {
                              if (!value || RegExpConst.MATCH_PASSWORD.test(value)) {
                                return Promise.resolve()
                              }
                              return Promise.reject(
                                new Error(
                                  `${t('common:form.invalid.head')} ${t(
                                    'auth.forgot-password:confirm.form.password'
                                  )} ${t('common:form.invalid.tail')}`
                                )
                              )
                            }
                          })
                        ]}
                      >
                        <Input.Password maxLength={20} />
                      </Form.Item>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('common:passwordHint.a')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('common:passwordHint.b')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('common:passwordHint.c')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('common:passwordHint.d')}
                      </Text>
                      <Text type="secondary" className="hps-text-small d-block">
                        {t('common:passwordHint.e')}
                      </Text>
                    </Col>
                    <Col
                      className="mt-5"
                      lg={{ span: 10, offset: 7 }}
                      md={{ span: 12, offset: 6 }}
                      xs={24}
                    >
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
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ForgotPasswordConfirm
