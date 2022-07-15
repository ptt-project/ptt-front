import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import t from '~/locales'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './ProfileEmail.module.scss'

const { Text, Title } = Typography

interface IFormModel {
  email: string
  password: string
}

const Email: FC = () => {
  const [form] = Form.useForm()

  function onSubmit(values: IFormModel): void {
    console.log(values)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('profile.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('profile.form.setting') },
          { title: t('profile.form.title') },
          { title: t('profile.form.personalInfo'), href: '/settings/account/info' },
          { title: t('profile.email.title'), href: '/settings/account/info/email' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('profile.email.title')}
              </Title>
              <Row className={styles.highlight}>
                <Col md={{ span: 4, offset: 6 }} xs={8}>
                  <Text>{t('profile.email.currentEmail')} :</Text>
                </Col>
                <Col md={12} xs={16}>
                  <Text className={styles.textPrimary}>Ne******@gmail.com</Text>
                </Col>
              </Row>
              <Row>
                <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                  <Form layout="vertical" form={form} name="accountEmail" onFinish={onSubmit}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label={t('profile.email.currentEmail')}
                          name="currentEmail"
                        >
                          <Input maxLength={50} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label={t('profile.email.password')}
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: `${t('common.form.required')} ${t(
                                'profile.form.email'
                              )}`
                            },
                            {
                              type: 'email',
                              message: `${t('common.form.invalid.head')} ${t(
                                'profile.form.email'
                              )} ${t('common.form.invalid.tail')}`
                            }
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                      <Col span={24} className="text-center mb-5">
                        <Text type="secondary">{t('profile.email.msgConfirm')}</Text>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('profile.button.confirm')}
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
    </main>
  )
}

export default Email
