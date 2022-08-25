import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { isEmpty } from 'lodash'
import { Typography, Space, Button, Image, Row, Col, Form, Checkbox, message } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import Loading from '~/components/main/Loading'
import OtpModal from '~/components/main/OtpModal'
import { IAuthRegisterForm, IAuthRegisterService, IOtpData } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { AuthService } from '~/services'
import { OtpTypeEnum } from '~/enums'
import styles from './RegisterConsent.module.scss'

const { Text, Title } = Typography

interface IFormConsentModel {
  acceptConsent: boolean
}

interface IRegisterConsentProps {
  form: IAuthRegisterForm
  setStep: (step: number) => void
}

const RegisterConsent: FC<IRegisterConsentProps> = (props: IRegisterConsentProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register'])

  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  async function onSubmit(otpData: IOtpData): Promise<void> {
    toggle()
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IAuthRegisterService = {
        firstName: props.form.firstName,
        lastName: props.form.lastName,
        mobile: props.form.mobile,
        email: props.form.email,
        username: props.form.username,
        password: props.form.password,
        pdpaStatus: true,
        otpCode: otpData.otpCode,
        refCode: otpData.refCode
      }
      await AuthService.register(payload)
      isSuccess = true
      props.setStep(2)
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  return (
    <>
      <Loading show={isLoading} />
      <OtpModal
        mobile={props.form.mobile}
        action={OtpTypeEnum.REGISTER}
        isOpen={isOpen}
        toggle={toggle}
        onSubmit={onSubmit}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <div className={styles.imgContainer}>
                <Image
                  rootClassName={styles.imgWrapper}
                  preview={false}
                  src="./images/main/buyer/register-consent.png"
                  alt="register-consent"
                />
              </div>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} xs={24}>
              <Title className="hps-title" level={4}>
                {t('auth.register:consent.title')}
              </Title>
              <Row>
                <Col span={24}>
                  <Space className="mb-5">
                    <Text type="secondary">{t('auth.register:consent.content')}</Text>
                  </Space>
                </Col>
              </Row>
              <Form name="registerConsent" form={form} onFinish={onAccept}>
                <Row>
                  <Col span={24}>
                    <Form.Item className="mb-3" name="acceptConsent" valuePropName="checked">
                      <Checkbox onChange={onChangeChecked}>
                        {t('auth.register:consent.checkbox')}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item>
                      <Button htmlType="submit" type="primary" block disabled={!checked}>
                        {t('common:next')}
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
