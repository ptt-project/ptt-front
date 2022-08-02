import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordByEmailSuccess from './components/ForgotPasswordByEmailSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import OtpModal from '~/components/main/OtpModal'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IForgotPasswordForm } from '~/model/Auth'
import { IOtpData } from '~/model/Common'

const ForgotPassword: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(0) // 0=FORGOT_PASSWORD_FORM, 1=FORGOT_PASSWORD_SUCCESS
  const [email, setEmail] = useState<string>('')
  const [mobileNo, setMobileNo] = useState<string>('')

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: IForgotPasswordForm): void {
    try {
      console.log(values)
      if (RegExpConst.CHECK_EMAIL.test(values.emailOrMobileNo)) {
        setEmail(values.emailOrMobileNo)
        setStep(1)
      } else if (values.emailOrMobileNo.replace(RegExpConst.ALLOW_NUMBER, '').length === 10) {
        setMobileNo(values.emailOrMobileNo)
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
      <OtpModal mobileNo={mobileNo} isOpen={isOpen} toggle={toggle} onSubmit={onSubmitOtp} />
      {renderStep()}
    </main>
  )
}

export default ForgotPassword
