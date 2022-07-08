import React, { useState, useEffect, FC, ChangeEvent } from 'react'
import { Typography, Button, Row, Col, Input, Modal } from 'antd'
import t from '~/locales'
import { RegExpList } from '~/constants'
import { IOtpData } from '~/model/Common'
import styles from './OtpModal.module.scss'

const { Text } = Typography

interface IOtpModalProps {
  isOpen: boolean
  toggle: () => void
  title?: string
  mobileNo: string
  onSubmit: (otpData: IOtpData) => void
}

const OtpModal: FC<IOtpModalProps> = (props: IOtpModalProps) => {
  const [otpInput, setOtpInput] = useState<string>('')
  const [timer, setTimer] = useState<number>(0)
  const [otpData, setOtpData] = useState<IOtpData>({
    otp: '',
    refCode: ''
  })

  useEffect(() => {
    if (
      props.isOpen &&
      props.mobileNo &&
      props.mobileNo.replace(RegExpList.ALLOW_NUMBER, '').length === 10
    ) {
      onRequestOtp()
    }
  }, [props.isOpen, props.mobileNo])

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
    const reg: RegExp = /^[0-9\b]+$/
    if (!e.target.value || reg.test(e.target.value)) {
      setOtpInput(e.target.value)
    } else {
      setOtpInput(e.target.value.replace(/[^0-9.]/g, ''))
    }
  }

  function onRequestOtp(): void {
    setTimer(1.5 * 60 * 1000)
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
    <Modal
      title={
        <Text>
          <h4 className="mb-0 text-center">
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {props.title || t('components.otpModal.title')}
          </h4>
        </Text>
      }
      visible={props.isOpen}
      onCancel={toggle}
      footer={[
        <Row key="otpModalFooter">
          <Col className="text-left" span={8}>
            <Button
              className="hps-btn-secondary"
              style={{ width: 136 }}
              onClick={onRequestOtp}
              disabled={timer !== 0}
            >
              {`${t('components.otpModal.request')}${renderTimer()}`}
            </Button>
          </Col>
          <Col span={16}>
            <Button type="default" onClick={toggle}>
              {t('common.close')}
            </Button>
            <Button type="primary" disabled={otpInput.length !== 6} onClick={onSubmit}>
              {t('common.confirm')}
            </Button>
          </Col>
        </Row>
      ]}
    >
      <div className={styles.label}>
        <div className={styles.left}>
          <Text className={styles.required}>*</Text>
          <Text>{t('components.otpModal.label')}</Text>
        </div>
        <div className={styles.right}>
          <Text type="secondary">{t('components.otpModal.ref')}</Text>
        </div>
      </div>
      <Input maxLength={6} onChange={onChangeOtp} value={otpInput} />
    </Modal>
  )
}

OtpModal.defaultProps = {
  title: ''
}

export default OtpModal
