import React, { FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Typography, Space, Button, Row, Col, Image } from 'antd'
import t from '~/locales'
import { Url } from '~/utils/main'
import styles from './ForgotPasswordByEmailSuccess.module.scss'

const { Text } = Typography

interface IForgotPasswordByEmailSuccessProps {
  email: string
}

const ForgotPasswordByEmailSuccess: FC<IForgotPasswordByEmailSuccessProps> = (
  props: IForgotPasswordByEmailSuccessProps
) => {
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
                src="./images/main/buyer/forgot-password.png"
              />
            </div>
          </Col>
          <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
            <Text>
              <h4 className={`${styles.cSecondary} text-center mb-5`}>
                {t('auth.forgotPassword.title')}
              </h4>
            </Text>
            <Row>
              <Col xl={{ span: 12, offset: 6 }} xs={24}>
                <div className={styles.imgContainer}>
                  <Image
                    rootClassName={styles.imgWrapper}
                    preview={false}
                    width="100%"
                    src="./images/main/buyer/forgot-password-success.png"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Space className={styles.space} wrap>
                  <Text>{t('auth.forgotPassword.success.messageA')}</Text>
                  <Text className={styles.cSecondary}>{props.email}</Text>
                  <Text>{t('auth.forgotPassword.success.messageB')}</Text>
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
                  href={Url.href('/', router.locale)}
                >
                  {t('common.ok')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ForgotPasswordByEmailSuccess
