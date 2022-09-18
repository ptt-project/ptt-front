import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Input, Modal, message } from 'antd'
import Loading from '../Loading'
import { IOtpRequestPayload, IOtp, IApiResponse } from '~/interfaces'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { OtpService } from '~/services'
import { OtpTypeEnum } from '~/enums'
import styles from './OtpModal.module.scss'

const { Text, Title } = Typography

interface IOtpModalProps {
  isOpen: boolean
  toggle: () => void
  title?: string
  mobile: string
  action: OtpTypeEnum
  onSubmit: (otpData: IOtp) => void
}

const OtpModal: FC<IOtpModalProps> = (props: IOtpModalProps) => {
  const { t } = useTranslation(LocaleNamespaceConst)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [otpInput, setOtpInput] = useState<string>('')
  const [timer, setTimer] = useState<number>(0)
  const [otpData, setOtpData] = useState<IOtp>({
    otpCode: '',
    refCode: '',
    reference: ''
  })

  useEffect(() => {
    if (
      props.isOpen &&
      props.mobile &&
      props.mobile.replace(RegExpConst.ALLOW_NUMBER, '').length === 10
    ) {
      onRequestOtp()
    }
  }, [props.isOpen, props.mobile])

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
    props.toggle()
  }

  function onChangeOtp(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      setOtpInput(e.target.value)
    } else {
      setOtpInput(e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
    }
  }

  async function onRequestOtp(): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IOtpRequestPayload = { reference: props.mobile, type: props.action }
      const { data }: IApiResponse = await OtpService.requestOtp(payload)
      isSuccess = true
      setOtpData({ ...data, otpCode: data.otpCode || '' })
    } catch (error) {
      console.log(error)
    }
    setTimer(1.5 * 60 * 1000)
    console.log('++++', isSuccess)
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  function onSubmit(): void {
    try {
      props.onSubmit(otpData)
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
      <Loading show={isLoading} />
      <Modal
        title={
          <Title className="mb-0" level={4}>
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {props.title || t('otp-modal:title')}
          </Title>
        }
        visible={props.isOpen}
        onCancel={toggle}
        footer={
          <Row>
            <Col className="text-left" span={8}>
              <Button
                className="hps-btn-secondary"
                style={{ width: 136 }}
                onClick={onRequestOtp}
                disabled={timer !== 0}
              >
                {`${t('otp-modal:request')}${renderTimer()}`}
              </Button>
            </Col>
            <Col span={16}>
              <Button type="default" onClick={toggle}>
                {t('common:close')}
              </Button>
              <Button type="primary" disabled={otpInput.length !== 6} onClick={onSubmit}>
                {t('common:confirm')}
              </Button>
            </Col>
          </Row>
        }
      >
        <div className={styles.label}>
          <div className={styles.left}>
            <Text className={styles.required}>*</Text>
            <Text>
              {/* Mockup */}
              {t('otp-modal:label')} {otpData.otpCode}
            </Text>
          </div>
          <div className={styles.right}>
            <Text type="secondary">
              {t('otp-modal:ref')} {otpData.refCode}
            </Text>
          </div>
        </div>
        <Input maxLength={6} onChange={onChangeOtp} value={otpInput} />
      </Modal>
    </>
  )
}

OtpModal.defaultProps = {
  title: ''
}

export default OtpModal
