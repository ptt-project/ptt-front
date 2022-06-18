import React, { FC, useState } from 'react'
import t from '~/locales'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Space, Button, Row, Col, Form, Input, Divider, Image } from 'antd'
import styles from './Register.module.scss'

const { Text, Link } = Typography
interface FormValues {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

const Register: FC = (props: any) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  async function onSubmit(values: FormValues): Promise<void> {
    console.log(typeof values)
  }

  return (
    <main className={`main ${styles.authRegister}`}>
      <Helmet>
        <title>
          {t('meta.title')} | {t('auth.register.title')}
        </title>
      </Helmet>
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
      <div className="page-content mt-4 mb-10 pb-6">
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
            <Col xl={18} lg={24}>
              <Text>
                <h4 className="text-center mb-5">{t('auth.register.title')}</h4>
              </Text>
              <Form
                layout="vertical"
                // initialValues={{
                //   firstName: '',
                //   lastName: '',
                //   mobileNo: '',
                //   email: '',
                //   username: '',
                //   password: ''
                // }}
                form={form}
                name="register"
                onFinish={onSubmit}
              >
                <Row gutter={[16, 8]}>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.firstName')}
                      name="firstName"
                      rules={[{ required: true, message: t('auth.register.rules.firstName') }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.lastName')}
                      name="lastName"
                      rules={[{ required: true, message: t('auth.register.rules.lastName') }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.mobileNo')}
                      name="mobileNo"
                      rules={[{ required: true, message: t('auth.register.rules.mobileNo') }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.email')}
                      name="email"
                      rules={[{ required: true, message: t('auth.register.rules.email') }]}
                    >
                      <Input type="email" />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.username')}
                      name="username"
                      rules={[{ required: true, message: t('auth.register.rules.username') }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('auth.register.password')}
                      name="password"
                      rules={[{ required: true, message: t('auth.register.rules.password') }]}
                    >
                      <Input type="password" />
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
                    <Link className={styles.link} href="#">
                      {t('auth.register.policyB')}
                    </Link>
                    <Text>&</Text>
                    <Link className={styles.link} href="#">
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
              <Divider className="mb-0">{t('auth.register.noteA')}</Divider>
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
