import React, { useState, FC } from 'react'
import { Typography, Space, Button, Row, Col, Form, Checkbox, Image } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { isEmpty } from 'lodash'
import OtpModal from '~/components/main/OtpModal'
import t from '~/locales'
import { IRegisterForm } from '~/model/Auth'
import { IOtpData } from '~/model/Common'
import styles from './RegisterConsent.module.scss'

const { Text } = Typography

interface IFormConsentModel {
  acceptConsent: boolean
}

interface IRegisterConsentProps {
  form: IRegisterForm
  setStep: (step: number) => void
}

const RegisterConsent: FC<IRegisterConsentProps> = (props: IRegisterConsentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [checked, setChecked] = useState<boolean>(false)

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onChangeChecked(e: CheckboxChangeEvent): void {
    setChecked(e.target.checked)
  }

  function onAccept(values: IFormConsentModel): void {
    let isInvalid: number = 0
    Object.keys(props.form).forEach((key: string) => {
      if (isEmpty(props.form[key])) {
        isInvalid++
      }
    })
    if (!isInvalid && values.acceptConsent) {
      setIsOpen(true)
    }
  }

  function onSubmit(otpData: IOtpData): void {
    try {
      props.setStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <OtpModal isOpen={isOpen} toggle={toggle} onSubmit={onSubmit} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
                <Image
                  rootClassName={styles.imgWrapper}
                  preview={false}
                  width="100%"
                  src="./images/main/buyer/register-consent.png"
                />
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Text>
                <h4 className={`${styles.cSecondary} text-center mb-5`}>
                  {t('auth.register.consent.title')}
                </h4>
              </Text>
              <Row>
                <Col span={24}>
                  <Space className="mb-5">
                    <Text type="secondary">{t('auth.register.consent.content')}</Text>
                  </Space>
                </Col>
              </Row>
              <Form name="registerConsent" form={form} onFinish={onAccept}>
                <Row>
                  <Col span={24}>
                    <Form.Item className="mb-3" name="acceptConsent" valuePropName="checked">
                      <Checkbox onChange={onChangeChecked}>
                        {t('auth.register.consent.checkbox')}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item>
                      <Button htmlType="submit" type="primary" block disabled={!checked}>
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
    </>
  )
}

export default RegisterConsent
