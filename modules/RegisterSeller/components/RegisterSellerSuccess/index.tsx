import React, { FC } from 'react'
import styles from './RegisterSellerSuccess.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Image } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title } = Typography

const RegisterSellerSuccess: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register-seller'])

  return (
    <div className="page-content mb-9">
      <div className="container">
        <Row gutter={48}>
          <Col xl={6} lg={0}>
            <div className={styles.sideImgContainer}>
              <Image
                rootClassName={styles.imgWrapper}
                preview={false}
                src="./images/main/seller/login.png"
                alt="login-seller"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Title className="hps-title" level={4}>
              {t('auth.register-seller:success.title')}
            </Title>
            <Row>
              <Col xl={{ span: 12, offset: 6 }} xs={24}>
                <div className={styles.imgContainer}>
                  <Image
                    rootClassName={styles.imgWrapper}
                    preview={false}
                    src="./images/main/seller/register-success.png"
                    alt="register-seller-success"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={styles.message}>
                  <Text type="secondary">{t('auth.register-seller:success.message')}</Text>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RegisterSellerSuccess
