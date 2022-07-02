import React, { useState, FC, ChangeEvent } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Typography, Space, Button, Row, Col, Form, Input, Divider, Image, Modal } from 'antd'
import { Rule } from 'antd/lib/form'
import { isEmpty } from 'lodash'
import t from '~/locales'
import { RegExpList } from '~/constants'
import { IRegisterForm } from '~/model/Auth'
import { Url } from '~/utils/main'
import styles from './RegisterForm.module.scss'

const { Text, Link } = Typography

interface IModalModel {
  isOpen: string
  title: string
  content: string
}

interface IRegisterFormProps {
  setForm: (form: IRegisterForm) => void
  setStep: (step: number) => void
}

const RegisterForm: FC<IRegisterFormProps> = (props: IRegisterFormProps) => {
  const router: NextRouter = useRouter()
  const [modal, setModal] = useState<IModalModel>({
    isOpen: '',
    title: '',
    content: ''
  })
  const [form] = Form.useForm()
  const passwordMessage: string = t('auth.register.form.rules.password') // prevent error hook rules

  function toggle(isOpen: string): void {
    const tempModal: IModalModel = { ...modal }
    if (!isEmpty(isOpen)) {
      tempModal.isOpen = isOpen
      if (isOpen === 'TERM') {
        tempModal.title = 'auth.register.form.policyB'
        tempModal.content = 'auth.register.form.policyBContent'
      }
      if (isOpen === 'CONDITION') {
        tempModal.title = 'auth.register.form.policyC'
        tempModal.content = 'auth.register.form.policyCContent'
      }
    } else {
      tempModal.isOpen = ''
    }
    setModal(tempModal)
  }

  function onMobileNoChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpList.CHECK_NUMBER.test(e.target.value)) {
      form.setFieldsValue({ mobileNo: e.target.value })
    } else {
      form.setFieldsValue({ mobileNo: e.target.value.replace(RegExpList.ALLOW_NUMBER, '') })
    }
  }

  function onSubmit(values: IRegisterForm): void {
    props.setForm(values)
    props.setStep(1)
  }

  return (
    <>
      <Modal
        title={
          <Text>
            <h4 className="mb-0 text-center">{modal.title ? t(modal.title) : ''}</h4>
          </Text>
        }
        width={768}
        visible={!isEmpty(modal.isOpen)}
        onCancel={(): void => toggle('')}
        footer={[
          <div className={styles.modalFooterWrapper}>
            <Button key="close" type="primary" block onClick={(): void => toggle('')}>
              {t('common.close')}
            </Button>
          </div>
        ]}
      >
        {modal.content ? (
          <div className={styles.modalBodyWrapper}>
            <Text type="secondary">{t(modal.content)}</Text>
          </div>
        ) : null}
      </Modal>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
                <Image
                  rootClassName={styles.imgWrapper}
                  preview={false}
                  width="100%"
                  src="./images/main/buyer/register-form.png"
                />
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Text>
                <h4 className={`${styles.cSecondary} text-center mb-5`}>
                  {t('auth.register.title')}
                </h4>
              </Text>
              <Form layout="vertical" name="registerForm" form={form} onFinish={onSubmit}>
                <Row gutter={[16, 8]}>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.form.firstName')}
                      name="firstName"
                      rules={[{ required: true, message: t('auth.register.form.rules.firstName') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.form.lastName')}
                      name="lastName"
                      rules={[{ required: true, message: t('auth.register.form.rules.lastName') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.form.mobileNo')}
                      name="mobileNo"
                      rules={[
                        { required: true, message: t('auth.register.form.rules.mobileNo') },
                        { min: 10, message: t('auth.register.form.rules.mobileNo') }
                      ]}
                    >
                      <Input maxLength={10} onChange={onMobileNoChange} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.form.email')}
                      name="email"
                      rules={[{ type: 'email', message: t('auth.register.form.rules.email') }]}
                    >
                      <Input type="email" maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.form.username')}
                      name="username"
                      rules={[{ required: true, message: t('auth.register.form.rules.username') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.form.password')}
                      name="password"
                      rules={[
                        { required: true, message: passwordMessage },
                        (): any => ({
                          validator(_: Rule, value: string): Promise<any> {
                            if (!value || RegExpList.CHECK_PASSWORD.test(value)) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error(passwordMessage))
                          }
                        })
                      ]}
                    >
                      <Input type="password" maxLength={50} />
                    </Form.Item>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.form.passwordHintA')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.form.passwordHintB')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.form.passwordHintC')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.form.passwordHintD')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.form.passwordHintE')}
                    </Text>
                  </Col>
                </Row>
                <Space className={`${styles.space} mt-5 mb-3`} wrap>
                  <Text>{t('auth.register.form.policyA')}</Text>
                  <Space>
                    <Link className={styles.link} onClick={(): void => toggle('TERM')}>
                      {t('auth.register.form.policyB')}
                    </Link>
                    <Text>&</Text>
                    <Link className={styles.link} onClick={(): void => toggle('CONDITION')}>
                      {t('auth.register.form.policyC')}
                    </Link>
                  </Space>
                </Space>
                <Form.Item>
                  <Button className="mb-5" htmlType="submit" type="primary" block>
                    {t('auth.register.title')}
                  </Button>
                </Form.Item>
              </Form>
              <Divider>{t('auth.register.form.divider')}</Divider>
              <Space className={styles.space} wrap>
                <Text>{t('auth.register.form.loginA')}</Text>
                <Link href={Url.href('/auth/login', router.locale)} className={styles.link}>
                  {t('auth.register.form.loginB')}
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
