import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import t from '~/locales'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './ProfilePhone.module.scss'

const { Text } = Typography

const AddPhone: FC = () => {
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
          { title: t('accountProfile.phone.titleEdit'), href: '/settings/account/info/phone' },
          { title: t('accountProfile.phone.titleAdd'), href: '/settings/account/info/add-phone' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24} xs={64}>
              <Text>
                <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                  {t('accountProfile.phone.titleAdd')}
                </h4>
              </Text>
              <Form layout="vertical">
                <Row gutter={[16, 8]}>
                  <Col xs={24} xl={{ span: 16, offset: 4 }}>
                    <Form.Item label={t('accountProfile.phone.newPhone')} name="phone">
                      <Input maxLength={10} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={{ span: 16, offset: 4 }}>
                    <Form.Item>
                      <Button htmlType="submit" className={styles.textSecondary} block>
                        {t('accountProfile.button.sendVerificationCode')}
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={{ span: 16, offset: 4 }}>
                    <Form.Item label={t('accountProfile.phone.otp')} name="otp">
                      <Input maxLength={10} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={{ span: 16, offset: 4 }}>
                    <Form.Item>
                      <Button type="primary" block>
                        {t('accountProfile.button.addPhone')}
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

export default AddPhone
