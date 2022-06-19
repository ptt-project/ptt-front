import React, { useState, FC, ChangeEvent } from 'react'
import t from '~/locales'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { isEmpty } from 'lodash'
import Helmet from 'react-helmet'
import { Typography, Space, Button, Row, Col, Form, Input, Divider, Image, Modal } from 'antd'
import { Rule } from 'antd/lib/form'
import styles from './Register.module.scss'

const { Text, Link } = Typography
interface FormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

interface ModalModel {
  isOpen: string
  title: string
  content: string
}

const Register: FC = () => {
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)
  const [modal, setModal] = useState<ModalModel>({
    isOpen: '',
    title: '',
    content: ''
  })
  const [form] = Form.useForm()
  const passwordMessage: string = t('auth.register.rules.password') // prevent error hook rules

  function toggle(isOpen: string): void {
    const tempModal: ModalModel = { ...modal }
    if (!isEmpty(isOpen)) {
      tempModal.isOpen = isOpen
      if (isOpen === 'TERM') {
        tempModal.title = 'auth.register.policyB'
        tempModal.content = 'auth.register.policyBContent'
      }
      if (isOpen === 'CONDITION') {
        tempModal.title = 'auth.register.policyC'
        tempModal.content = 'auth.register.policyCContent'
      }
    } else {
      tempModal.isOpen = ''
    }
    setModal(tempModal)
  }

  function onMobileNoChange(e: ChangeEvent<HTMLInputElement>): void {
    const reg: RegExp = /^[0-9\b]+$/
    if (!e.target.value || reg.test(e.target.value)) {
      form.setFieldsValue({ mobileNo: e.target.value })
    } else {
      form.setFieldsValue({ mobileNo: e.target.value.replace(/[^0-9.]/g, '') })
    }
  }

  async function onSubmit(values: FormModel): Promise<void> {
    console.log(typeof values)
  }

  return (
    <main className={`main ${styles.page}`}>
      <Helmet>
        <title>
          {t('meta.title')} | {t('auth.register.title')}
        </title>
      </Helmet>
      <Modal
        title={modal.title ? t(modal.title) : ''}
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
        {modal.content ? <Text>{t(modal.content)}</Text> : null}
      </Modal>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <NextLink href="/login" locale={router.locale}>
                <Link>
                  <i className="d-icon-home"></i>
                </Link>
              </NextLink>
            </li>
            <li>{t('auth.register.title')}</li>
          </ul>
        </div>
      </nav>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.sideImgContainer}>
                <div className={styles.sideImgWrapper}>
                  <Image
                    preview={visible}
                    width={'100%'}
                    src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                    onClick={() => setVisible(true)}
                  />
                </div>
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
              <Text>
                <h4 className="text-center mb-5">{t('auth.register.title')}</h4>
              </Text>
              <Form layout="vertical" form={form} name="register" onFinish={onSubmit}>
                <Row gutter={[16, 8]}>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.firstName')}
                      name="firstName"
                      rules={[{ required: true, message: t('auth.register.rules.firstName') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.lastName')}
                      name="lastName"
                      rules={[{ required: true, message: t('auth.register.rules.lastName') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.mobileNo')}
                      name="mobileNo"
                      rules={[{ required: true, message: t('auth.register.rules.mobileNo') }]}
                    >
                      <Input maxLength={10} onChange={onMobileNoChange} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.email')}
                      name="email"
                      rules={[{ type: 'email', message: t('auth.register.rules.email') }]}
                    >
                      <Input type="email" maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.username')}
                      name="username"
                      rules={[{ required: true, message: t('auth.register.rules.username') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.password')}
                      name="password"
                      rules={[
                        { required: true, message: passwordMessage },
                        () => ({
                          validator(_: Rule, value: string) {
                            const reg: RegExp =
                              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
                            if (!value || reg.test(value)) {
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
                      {t('auth.register.passwordHintA')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.passwordHintB')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.passwordHintC')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.passwordHintD')}
                    </Text>
                    <Text type="secondary" className="t-small d-block">
                      {t('auth.register.passwordHintE')}
                    </Text>
                  </Col>
                </Row>
                <Space className={`${styles.space} mt-5 mb-3`} wrap>
                  <Text>{t('auth.register.policyA')}</Text>
                  <Space>
                    <Link className={styles.link} onClick={(): void => toggle('TERM')}>
                      {t('auth.register.policyB')}
                    </Link>
                    <Text>&</Text>
                    <Link className={styles.link} onClick={(): void => toggle('CONDITION')}>
                      {t('auth.register.policyC')}
                    </Link>
                  </Space>
                </Space>
                <Form.Item>
                  <Button className="mb-5" htmlType="submit" type="primary" size="large" block>
                    {t('auth.register.title')}
                  </Button>
                </Form.Item>
              </Form>
              <Divider>{t('auth.register.noteA')}</Divider>
              <Space className={styles.space} wrap>
                <Text>{t('auth.register.noteB')}</Text>
                <NextLink href="/login" locale={router.locale}>
                  <Link className={styles.link}>{t('auth.register.noteC')}</Link>
                </NextLink>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Register
