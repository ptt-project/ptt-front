import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import t from '~/locales'
import styles from './ProfileEmail.module.scss'
import Breadcrumbs from '~/components/main/Breadcrumbs'

const { Text } = Typography
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
    <main className="main account">
      <Helmet>
        <title>
          {t('meta.title')} | {t('accountProfile.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('accountProfile.form.setting') },
          { title: t('accountProfile.form.title') },
          { title: t('accountProfile.form.personalInfo'), href: '/settings/account/info' },
          { title: t('accountProfile.email.title'), href: '/settings/account/info/email' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType="buyer"/>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24} xs={64} >
              <Text>
                <h4 className={`text-center mb-5 ${styles.textEmailTitle} ${styles.textPrimary}`}>
                  {t('accountProfile.email.title')}
                </h4>
              </Text>
              <Form layout="vertical" form={form} name="accountEmail" onFinish={onSubmit}>
                <Row gutter={[16, 8]}>
                  <Col md={24} xs={24} className="alert alert-message alert-light alert-primary">
                    <Text>{t('accountProfile.email.currentEmail')} :</Text>
                    <Text className={styles.textUnderline}> Ne******@gmail.com</Text>
                  </Col>
                  <Col md={24} xs={24}>
                    <Form.Item label={t('accountProfile.email.currentEmail')} name="currentEmail">
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={24}>
                    <Form.Item
                      label={t('accountProfile.email.password')}
                      name="password"
                      rules={[{ required: true, message: t('accountProfile.rules.email') }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={24} className="text-center">
                    <Text type="secondary">{t('accountProfile.email.msgConfirm')}</Text>
                  </Col>
                  <Col md={12} xs={12} offset={6}>
                    <Form.Item>
                      <Button htmlType="submit" className={styles.btnPrimary} block>
                        {t('accountProfile.button.confirm')}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Email
