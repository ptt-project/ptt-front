import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Space, Button, Image, Row, Col } from 'antd'
import { CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import { OtpReferenceTypeEnum } from '~/enums'
import styles from './ForgotPasswordSuccess.module.scss'

const { Text, Title } = Typography

interface IForgotPasswordSuccessProps {
  reference: string
  referenceType: OtpReferenceTypeEnum
}

const ForgotPasswordSuccess: FC<IForgotPasswordSuccessProps> = (
  props: IForgotPasswordSuccessProps
) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
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
                src="./images/main/buyer/forgot-password.png"
                alt="forgot-password"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Title className="hps-title" level={4}>
              {t('auth.forgot-password:success.title')}
            </Title>
            <Row>
              <Col xl={{ span: 12, offset: 6 }} xs={24}>
                <div className={styles.imgContainer}>
                  <Image
                    rootClassName={styles.imgWrapper}
                    preview={false}
                    src="./images/main/buyer/forgot-password-success.png"
                    alt="forgot-password-success"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Space className={styles.space} wrap>
                  {props.referenceType === OtpReferenceTypeEnum.MOBILE && (
                    <Text>{t('auth.forgot-password:success.mobile')}</Text>
                  )}
                  {props.referenceType === OtpReferenceTypeEnum.EMAIL && (
                    <Text>{t('auth.forgot-password:success.email')}</Text>
                  )}
                  <Text className={styles.cSecondary}>{props.reference}</Text>
                </Space>
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

export default ForgotPasswordSuccess
