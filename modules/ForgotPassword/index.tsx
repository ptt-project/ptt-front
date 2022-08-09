import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordByEmailSuccess from './components/ForgotPasswordByEmailSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import OtpModal from '~/components/main/OtpModal'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IAuthForgotPasswordForm, IOtpData } from '~/interfaces'
import { OtpTypeEnum } from '~/enums'

const ForgotPassword: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0) // 0=FORGOT_PASSWORD_FORM, 1=FORGOT_PASSWORD_SUCCESS
  const [email, setEmail] = useState<string>('')
  const [mobile, setMobile] = useState<string>('')

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: IAuthForgotPasswordForm): void {
    try {
      console.log(values)
      if (RegExpConst.CHECK_EMAIL.test(values.reference)) {
        setEmail(values.reference)
        setStep(1)
      } else if (values.reference.replace(RegExpConst.ALLOW_NUMBER, '').length === 10) {
        setMobile(values.reference)
        setIsOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function onSubmitOtp(otpData: IOtpData): void {
    try {
      console.log(otpData)
      toggle()
    } catch (error) {
      console.log(error)
    }
  }

  function renderStep(): JSX.Element {
    switch (step) {
      case 0: // FORGOT_PASSWORD_FORM
        return <ForgotPasswordForm onSubmit={onSubmit} />
      case 1: // FORGOT_PASSWORD_SUCCESS
        return <ForgotPasswordByEmailSuccess email={email} />
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
        mobile={mobile}
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
