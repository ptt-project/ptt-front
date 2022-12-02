import React, { FC } from 'react'
import Image from '../../../../components/main/Image'
import styles from './RegisterSuccess.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Button, Row, Col } from 'antd'
import { CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title } = Typography

const RegisterSuccess: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register'])
  const router: NextRouter = useRouter()

  return (
    <div className="page-content mb-9">
      <div className="container">
        <Row gutter={48}>
          <Col xl={6} lg={0}>
            <Image src="./images/main/buyer/register-form.png" alt="register-form" ratio={2 / 3} />
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Title className="hps-title" level={4}>
              {t('auth.register:success.title')}
            </Title>
            <Row>
              <Col xl={{ span: 12, offset: 6 }} xs={24}>
                <Image
                  src="./images/main/buyer/register-success.png"
                  alt="register-success"
                  ratio={3 / 2}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={styles.message}>
                  <Text type="secondary">{t('auth.register:success.message')}</Text>
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
                  href={CustomUrlUtil('/auth/login', router.locale)}
                >
                  {t('common:login')}
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
