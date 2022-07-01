import React, { useState, FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography } from 'antd'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordByEmailSuccess from './components/ForgotPasswordByEmailSuccess'
import OtpModal from '~/components/main/OtpModal'
import t from '~/locales'
import { RegExpList } from '~/constants'
import { IForgotPasswordForm } from '~/model/Auth'
import { IOtpData } from '~/model/Common'
import { Url } from '~/utils/main'

const { Link } = Typography

const ForgotPassword: FC = () => {
  const router: NextRouter = useRouter()
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
      if (RegExpList.CHECK_EMAIL.test(values.emailOrMobileNo)) {
        setEmail(values.emailOrMobileNo)
        setStep(1)
      } else if (values.emailOrMobileNo.replace(RegExpList.ALLOW_NUMBER, '').length === 10) {
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
      <OtpModal mobileNo={mobileNo} isOpen={isOpen} toggle={toggle} onSubmit={onSubmitOtp} />
      {renderStep()}
    </main>
  )
}

export default ForgotPassword
