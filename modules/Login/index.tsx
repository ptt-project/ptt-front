import React, { useState, FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Space, Button, Row, Col, Form, Input, Divider, Image } from 'antd'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import t from '~/locales'
import { CustomUrl } from '~/utils/main'
import { ILoginForm } from '~/model/Auth'
import { IFieldData } from '~/model/Common'
import styles from './Login.module.scss'

const { Title, Link } = Typography

const Login: FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<ILoginForm>({
    username: '',
    password: ''
  })

  function onChangeFields(_: IFieldData[], allFields: IFieldData[]): void {
    if (_.length) {
      const tempFormData: ILoginForm = { ...formData }
      tempFormData[_[0].name[0]] = _[0].value
      setFormData(tempFormData)
    }
  }

  function onSubmit(values: ILoginForm): void {
    console.log(values)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('auth.login.title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('auth.login.title') }]} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
                <Image
                  rootClassName={styles.imgWrapper}
                  preview={false}
                  src="./images/main/buyer/login.png"
                  alt="login"
                />
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Title className="hps-title" level={4}>
                {t('auth.login.title')}
              </Title>
              <Form
                layout="vertical"
                name="loginForm"
                form={form}
                onFieldsChange={onChangeFields}
                onFinish={onSubmit}
              >
                <Row>
                  <Col md={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item label={t('auth.login.form.username')} name="username">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item label={t('auth.login.form.password')} name="password">
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col className="mt-5" md={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        block
                        disabled={!formData.username || !formData.password}
                      >
                        {t('auth.login.title')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Divider>{t('auth.login.divider')}</Divider>
              <Space className={styles.space} wrap>
                <Link
                  href={CustomUrl.href('/auth/forgot-password', router.locale)}
                  className={styles.link}
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Login
