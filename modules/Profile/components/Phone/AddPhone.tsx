import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import t from '~/locales'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './ProfilePhone.module.scss'

const { Title } = Typography

const AddPhone: FC = () => (
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
        { title: t('accountProfile.phone.titleEdit'), href: '/settings/account/info/phone' },
        { title: t('accountProfile.phone.titleAdd'), href: '/settings/account/info/add-phone' }
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
              {t('accountProfile.phone.titleAdd')}
            </Title>
            <Form layout="vertical">
              <Row>
                <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                  <Row>
                    <Col span={24}>
                      <Form.Item label={t('accountProfile.phone.newPhone')} name="phone">
                        <Input maxLength={10} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item>
                        <Button htmlType="submit" className={styles.textSecondary} block>
                          {t('accountProfile.button.sendVerificationCode')}
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label={t('accountProfile.phone.otp')} name="otp">
                        <Input maxLength={10} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item>
                        <Button type="primary" block>
                          {t('accountProfile.button.addPhone')}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  </main>
)

export default AddPhone
