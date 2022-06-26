import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import { Typography, Space, Button, Row, Col, Form, Input, Checkbox, Image, Modal } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { isEmpty } from 'lodash'
import t from '~/locales'
import styles from './RegisterConsent.module.scss'

const { Text } = Typography

interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

interface IFormConsentModel {
  acceptConsent: boolean
}

interface IRegisterConsentProps {
  form: IFormModel
  setStep: (step: number) => void
}

const RegisterConsent: FC<IRegisterConsentProps> = (props: IRegisterConsentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [checked, setChecked] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [timer, setTimer] = useState<number>(0)

  useEffect(() => {
    const countDown: any = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1000)
      }
      if (timer === 0) {
        clearInterval(countDown)
      }
    }, 1000)
    return (): void => {
      clearInterval(countDown)
    }
  }, [timer])

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onChangeChecked(e: CheckboxChangeEvent): void {
    setChecked(e.target.checked)
  }

  function onChangeOtp(e: ChangeEvent<HTMLInputElement>): void {
    const reg: RegExp = /^[0-9\b]+$/
    if (!e.target.value || reg.test(e.target.value)) {
      setOtp(e.target.value)
    } else {
      setOtp(e.target.value.replace(/[^0-9.]/g, ''))
    }
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

  function onRequestOtp(): void {
    setTimer(1.5 * 60 * 1000)
  }

  function onSubmit(): void {
    try {
      props.setStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  function renderTimer(): string {
    if (timer) {
      const min: number = Math.floor(timer / 60000)
      const sec: string = ((timer % 60000) / 1000).toFixed(0)
      return ` (${min}:${parseInt(sec) < 10 ? '0' : ''}${sec})`
    }
    return ''
  }

  return (
    <>
      <Modal
        title={
          <Text>
            <h4 className="mb-0 text-center">
              <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
              {t('auth.register.consent.otp.title')}
            </h4>
          </Text>
        }
        visible={isOpen}
        onCancel={toggle}
        footer={[
          <Row>
            <Col className="text-left" span={8}>
              <Button
                key="request"
                className={styles.button}
                onClick={onRequestOtp}
                disabled={timer !== 0}
              >
                {`${t('auth.register.consent.otp.request')}${renderTimer()}`}
              </Button>
            </Col>
            <Col span={16}>
              <Button key="close" type="default" onClick={toggle}>
                {t('common.close')}
              </Button>
              <Button key="confirm" type="primary" disabled={otp.length !== 6} onClick={onSubmit}>
                {t('common.confirm')}
              </Button>
            </Col>
          </Row>
        ]}
      >
        <div className={styles.label}>
          <div className={styles.left}>
            <Text className={styles.required}>*</Text>
            <Text>{t('auth.register.consent.otp.label')}</Text>
          </div>
          <div className={styles.right}>
            <Text type="secondary">{t('auth.register.consent.otp.ref')}</Text>
          </div>
        </div>
        <Input maxLength={6} onChange={onChangeOtp} value={otp} />
      </Modal>
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
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        disabled={!checked}
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
    </>
  )
}

export default RegisterConsent
