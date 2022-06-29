import React, { useState, FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input, Image } from 'antd'
import t from '~/locales'
import { Url } from '~/utils/main'
import { IForgotPasswordForm } from '~/model/Auth'
import styles from './ForgotPassword.module.scss'

const { Text, Link } = Typography
interface IFieldData {
  name: string | number | (string | number)[]
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

const ForgotPassword: FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<IForgotPasswordForm>({
    emailOrMobileNo: ''
  })

  function onChangeFields(_: IFieldData[], allFields: IFieldData[]): void {
    if (_.length) {
      const tempFormData: IForgotPasswordForm = { ...formData }
      tempFormData[_[0].name[0]] = _[0].value
      setFormData(tempFormData)
    }
  }

  function onSubmit(values: IForgotPasswordForm): void {
    console.log(values)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('auth.forgotPassword.title')}
        </title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link href={Url.href('/', router.locale)}>
                <i className="d-icon-home" />
              </Link>
            </li>
            <li>{t('auth.forgotPassword.title')}</li>
          </ul>
        </div>
      </nav>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
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
              <Form
                layout="vertical"
                name="forgotPasswordForm"
                form={form}
                onFieldsChange={onChangeFields}
                onFinish={onSubmit}
              >
                <Row>
                  <Col md={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item
                      label={t('auth.forgotPassword.form.emailOrMobileNo')}
                      name="emailOrMobileNo"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        block
                        disabled={!formData.emailOrMobileNo}
                      >
                        {t('common.next')}
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

export default ForgotPassword
