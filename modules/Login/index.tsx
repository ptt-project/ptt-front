import React, { useState, FC } from 'react'
import Helmet from 'react-helmet'
import Image from '../../components/main/Image'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '~/components/main/Loading'
import styles from './Login.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Space, Button, Row, Col, Form, Input, Divider, message } from 'antd'
import { AuthInitUtil, CustomUrlUtil } from '~/utils/main'
import { IAuthLoginPayload, IFieldData } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { AuthService } from '~/services'
import { AxiosError } from 'axios'

const { Title, Link } = Typography

const Login: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.login'])
  const router: NextRouter = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<IAuthLoginPayload>({
    username: '',
    password: ''
  })

  function onChangeFields(_: IFieldData[], allFields: IFieldData[]): void {
    if (_.length) {
      const tempFormData: IAuthLoginPayload = { ...formData }
      tempFormData[_[0].name[0]] = _[0].value

      setFormData(tempFormData)
    }
  }

  async function onSubmit(values: IAuthLoginPayload): Promise<void> {
    try {
      setIsLoading(true)

      const payload: IAuthLoginPayload = { ...values }
      const { data } = await AuthService.login(payload)

      AuthInitUtil(data)
      message.success(t('common:apiMessage.success'))

      if (router.query.redirect) {
        router.replace(router.query.redirect.toString())
      } else {
        router.replace('/')
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          case 101004:
            message.error(t('message:buyer.auth.login.invalidUsername'))
            break
          case 101005:
            message.error(t('message:buyer.auth.login.invalidPassword'))
            break
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('auth.login:title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('auth.login:title') }]} />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <Image src="./images/main/buyer/login.png" alt="login" ratio={2 / 3} />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Title className="hps-title" level={4}>
                {t('auth.login:title')}
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
                    <Form.Item label={t('auth.login:form.username')} name="username">
                      <Input maxLength={20} />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item label={t('auth.login:form.password')} name="password">
                      <Input.Password maxLength={20} />
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
                        {t('auth.login:title')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Divider>{t('auth.login:divider')}</Divider>
              <Space className={styles.space} wrap>
                <Link
                  href={CustomUrlUtil('/auth/forgot-password', router.locale)}
                  className={styles.link}
                >
                  {t('auth.login:forgotPassword')}
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
