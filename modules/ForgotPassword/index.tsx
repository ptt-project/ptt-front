import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { message } from 'antd'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordEmailRequest from './components/ForgotPasswordEmailRequest'
import ForgotPasswordConfirm from './components/ForgotPasswordConfirm'
import ForgotPasswordSuccess from './components/ForgotPasswordSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '../../components/main/Loading'
import OtpModal from '~/components/main/OtpModal'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IAuthForgotPasswordForm, IAuthResetPasswordPayload, IOtp } from '~/interfaces'
import { OtpReferenceTypeEnum, OtpTypeEnum } from '~/enums'
import { AuthDestroyUtil } from '~/utils/main'
import { AuthService } from '../../services'

const ForgotPassword: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0) // 0=FORGOT_PASSWORD_FORM, 1=FORGOT_PASSWORD_EMAIL_REQUEST, 2=FORGOT_PASSWORD_CONFIRM, 3=FORGOT_PASSWORD_SUCCESS
  const [reference, setReference] = useState<string>('')
  const [referenceType, setReferenceType] = useState<OtpReferenceTypeEnum>()
  const [password, setPassword] = useState<string>('')

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: IAuthForgotPasswordForm): void {
    try {
      setReference(values.reference)
      if (RegExpConst.CHECK_EMAIL.test(values.reference)) {
        setReferenceType(OtpReferenceTypeEnum.EMAIL)
        setStep(1)
      } else if (values.reference.replace(RegExpConst.ALLOW_NUMBER, '').length === 10) {
        setReferenceType(OtpReferenceTypeEnum.MOBILE)
        setStep(2)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function onSubmitOtp(values: IOtp): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IAuthResetPasswordPayload = {
        username: reference,
        password,
        otpCode: values.otpCode,
        refCode: values.refCode
      }
      await AuthService.resetPassword(payload)
      isSuccess = true
      toggle()
      AuthDestroyUtil()
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
      setStep(3)
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  function onSubmitNewPassword(values: { password: string }): void {
    toggle()
    setPassword(values.password)
  }

  function resetStep(): void {
    setStep(0)
  }

  function renderStep(): JSX.Element {
    switch (step) {
      case 0: // FORGOT_PASSWORD_FORM
        return <ForgotPasswordForm onSubmit={onSubmit} />
      case 1: // FORGOT_PASSWORD_EMAIL_REQUEST
        return <ForgotPasswordEmailRequest email={reference} />
      case 2: // FORGOT_PASSWORD_CONFIRM
        return (
          <ForgotPasswordConfirm
            reference={reference}
            onSubmit={onSubmitNewPassword}
            resetStep={resetStep}
          />
        )
      case 3: // FORGOT_PASSWORD_SUCCESS
        return <ForgotPasswordSuccess reference={reference} referenceType={referenceType} />
      default:
        return <ForgotPasswordForm onSubmit={onSubmit} />
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('auth.forgot-password:title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('auth.forgot-password:title') }]} />
      <Loading show={isLoading} />
      <OtpModal
        mobile={reference}
        action={OtpTypeEnum.REGISTER}
        isOpen={isOpen}
        toggle={toggle}
        onSubmit={onSubmitOtp}
      />
      {renderStep()}
    </main>
  )
}

export default ForgotPassword
