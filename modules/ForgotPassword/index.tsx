import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordEmailRequest from './components/ForgotPasswordEmailRequest'
import ForgotPasswordConfirm from './components/ForgotPasswordConfirm'
import ForgotPasswordSuccess from './components/ForgotPasswordSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import OtpModal from '~/components/main/OtpModal'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IAuthForgotPasswordForm, IOtp } from '~/interfaces'
import { OtpReferenceTypeEnum, OtpTypeEnum } from '~/enums'
import { AuthDestroyUtil } from '~/utils/main'

const ForgotPassword: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0) // 0=FORGOT_PASSWORD_FORM, 1=FORGOT_PASSWORD_EMAIL_REQUEST, 2=FORGOT_PASSWORD_CONFIRM, 3=FORGOT_PASSWORD_SUCCESS
  const [reference, setReference] = useState<string>('')
  const [referenceType, setReferenceType] = useState<OtpReferenceTypeEnum>()
  const [otpData, setOtpData] = useState<IOtp>({
    otpCode: '',
    refCode: '',
    reference: ''
  })

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
        setIsOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function onSubmitOtp(values: IOtp): void {
    try {
      setOtpData(values)
      setStep(2)
      toggle()
    } catch (error) {
      console.log(error)
    }
  }

  function onSubmitNewPassword(values: { password: string }): void {
    console.log(otpData)
    console.log(values)
    setStep(3)
    AuthDestroyUtil()
  }

  function renderStep(): JSX.Element {
    switch (step) {
      case 0: // FORGOT_PASSWORD_FORM
        return <ForgotPasswordForm onSubmit={onSubmit} />
      case 1: // FORGOT_PASSWORD_EMAIL_REQUEST
        return <ForgotPasswordEmailRequest email={reference} />
      case 2: // FORGOT_PASSWORD_CONFIRM
        return <ForgotPasswordConfirm reference={reference} onSubmit={onSubmitNewPassword} />
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
