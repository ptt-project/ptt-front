import React, { useState, FC, ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { isEmpty } from 'lodash'
import {
  Typography,
  Space,
  Button,
  Row,
  Col,
  Form,
  Input,
  Divider,
  Image,
  Modal,
  message
} from 'antd'
import { Rule } from 'antd/lib/form'
import Loading from '~/components/main/Loading'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IAuthRegisterForm, IAuthRegisterValidateService } from '~/interfaces'
import { CustomUrlUtil } from '~/utils/main'
import { AuthService } from '~/services'
import { CommonApiCodeEnum } from '~/enums'
import styles from './RegisterForm.module.scss'

const { Text, Title, Link } = Typography

interface IRegisterFormProps {
  setForm: (form: IAuthRegisterForm) => void
  setStep: (step: number) => void
}

const RegisterForm: FC<IRegisterFormProps> = (props: IRegisterFormProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register'])
  const router: NextRouter = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<string>('')
  const [form] = Form.useForm()

  function getModalTitle(): string {
    if (isOpen === 'TERM') {
      return t('auth.register:form.policyB')
    }
    if (isOpen === 'CONDITION') {
      return t('auth.register:form.policyC')
    }
    return ''
  }

  function getModalContent(): JSX.Element {
    let content: string = ''
    if (isOpen === 'TERM') {
      content = t('auth.register:form.policyBContent')
    }
    if (isOpen === 'CONDITION') {
      content = t('auth.register:form.policyCContent')
    }
    if (content) {
      return (
        <div className={styles.modalBodyWrapper}>
          <Text type="secondary">{content}</Text>
        </div>
      )
    }
    return null
  }

  function toggle(value: string): void {
    if (!isEmpty(value)) {
      setIsOpen(value)
    } else {
      setIsOpen('')
    }
  }

  function onMobileNoChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ mobile: e.target.value })
    } else {
      form.setFieldsValue({ mobile: e.target.value.replace(RegExpConst.ALLOW_NUMBER, '') })
    }
  }

  async function onSubmit(values: IAuthRegisterForm): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IAuthRegisterValidateService = {
        email: values.email,
        username: values.username
      }
      const result: AxiosResponse = await AuthService.registerValidate(payload)
      if (result.data?.code === CommonApiCodeEnum.SUCCESS) {
        isSuccess = true
        props.setForm(values)
        props.setStep(1)
      }
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

  return (
    <>
      <Loading show={isLoading} />
      <Modal
        title={
          <Title className="mb-0 text-center" level={4}>
            {getModalTitle()}
          </Title>
        }
        width={768}
        visible={!isEmpty(isOpen)}
        onCancel={(): void => toggle('')}
        footer={
          <div className={styles.modalFooterWrapper}>
            <Button type="primary" block onClick={(): void => toggle('')}>
              {t('common:close')}
            </Button>
          </div>
        }
      >
        {getModalContent()}
      </Modal>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
                <Image
                  rootClassName={styles.imgWrapper}
                  preview={false}
                  src="./images/main/buyer/register-form.png"
                  alt="register-form"
                />
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Title className="hps-title" level={4}>
                {t('auth.register:title')}
              </Title>
              <Form layout="vertical" name="registerForm" form={form} onFinish={onSubmit}>
                <Row gutter={[16, 8]}>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register:form.firstName')}
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register:form.firstName'
                          )}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register:form.lastName')}
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register:form.lastName'
                          )}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register:form.mobile')}
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t('auth.register:form.mobile')}`
                        },
                        {
                          min: 10,
                          message: `${t('common:form.min.head')} 10 ${t('common:form.min.tail')}`
                        }
                      ]}
                    >
                      <Input maxLength={10} onChange={onMobileNoChange} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register:form.email')}
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: `${t('common:form.invalid.head')} ${t(
                            'auth.register:form.email'
                          )} ${t('common:form.invalid.tail')}`
                        }
                      ]}
                    >
                      <Input type="email" maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register:form.username')}
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register:form.username'
                          )}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register:form.password')}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'auth.register:form.password'
                          )}`
                        },
                        (): any => ({
                          validator(_: Rule, value: string): Promise<any> {
                            if (!value || RegExpConst.CHECK_PASSWORD.test(value)) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              new Error(
                                `${t('common:form.invalid.head')} ${t(
                                  'auth.register:form.password'
                                )} ${t('common:form.invalid.tail')}`
                              )
                            )
                          }
                        })
                      ]}
                    >
                      <Input.Password maxLength={50} />
                    </Form.Item>
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
                  </Col>
                </Row>
                <Space className={`${styles.space} mt-5 mb-3`} wrap>
                  <Text>{t('auth.register:form.policyA')}</Text>
                  <Space>
                    <Link className={styles.link} onClick={(): void => toggle('TERM')}>
                      {t('auth.register:form.policyB')}
                    </Link>
                    <Text>&</Text>
                    <Link className={styles.link} onClick={(): void => toggle('CONDITION')}>
                      {t('auth.register:form.policyC')}
                    </Link>
                  </Space>
                </Space>
                <Form.Item>
                  <Button className="mb-5" htmlType="submit" type="primary" block>
                    {t('auth.register:title')}
                  </Button>
                </Form.Item>
              </Form>
              <Divider>{t('auth.register:form.divider')}</Divider>
              <Space className={styles.space} wrap>
                <Text>{t('auth.register:form.loginA')}</Text>
                <Link href={CustomUrlUtil('/auth/login', router.locale)} className={styles.link}>
                  {t('auth.register:form.loginB')}
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
