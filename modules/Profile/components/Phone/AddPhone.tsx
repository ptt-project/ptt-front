import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input } from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import styles from './ProfilePhone.module.scss'

const { Title } = Typography

const AddPhone: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'account.info'])
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('account.info:phone.titleAdd')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('account.info:setting') },
          { title: t('account.info:title') },
          { title: t('account.info:personalInfo'), href: '/settings/account/info' },
          { title: t('account.info:phone.titleEdit'), href: '/settings/account/info/phone' },
          { title: t('account.info:phone.titleAdd'), href: '/settings/account/info/add-phone' }
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
                {t('account.info:phone.titleAdd')}
              </Title>
              <Form layout="vertical">
                <Row>
                  <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                    <Row>
                      <Col span={24}>
                        <Form.Item label={t('account.info:phone.newPhone')} name="phone">
                          <Input maxLength={10} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button htmlType="submit" className={styles.textSecondary} block>
                            {t('account.info:button.sendVerificationCode')}
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label={t('account.info:phone.otp')} name="otp">
                          <Input maxLength={10} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button type="primary" block>
                            {t('account.info:button.addPhone')}
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
}

export default AddPhone
