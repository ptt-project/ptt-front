import React, { FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Typography, Button, Row, Col, Image } from 'antd'
import t from '~/locales'
import { CustomUrl } from '~/utils/main'
import styles from './RegisterSuccess.module.scss'

const { Text, Title } = Typography

const RegisterSuccess: FC = () => {
  const router: NextRouter = useRouter()

  return (
    <div className="page-content mb-9">
      <div className="container">
        <Row gutter={48}>
          <Col xl={6} lg={0}>
            <div className={styles.sideImgContainer}>
              <Image
                rootClassName={styles.imgWrapper}
                preview={false}
                width="100%"
                src="./images/main/buyer/register-form.png"
                alt="register-form"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Title className="hps-title" level={4}>
              {t('auth.register.success.title')}
            </Title>
            <Row>
              <Col xl={{ span: 12, offset: 6 }} xs={24}>
                <div className={styles.imgContainer}>
                  <Image
                    rootClassName={styles.imgWrapper}
                    preview={false}
                    width="100%"
                    src="./images/main/buyer/register-success.png"
                    alt="register-success"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={styles.message}>
                  <Text type="secondary">{t('auth.register.success.message')}</Text>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  className="mb-5"
                  htmlType="submit"
                  type="primary"
                  block
                  href={CustomUrl.href('/auth/login', router.locale)}
                >
                  {t('auth.register.success.login')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RegisterSuccess
