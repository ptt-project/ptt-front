import React, { useState, FC } from 'react'
import Helmet from 'react-helmet'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordEmailRequest from './components/ForgotPasswordEmailRequest'
import ForgotPasswordConfirm from './components/ForgotPasswordConfirm'
import ForgotPasswordSuccess from './components/ForgotPasswordSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '../../components/main/Loading'
import OtpModal from '~/components/main/OtpModal'
import { useTranslation } from 'next-i18next'
import { message } from 'antd'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { IAuthForgotPasswordForm, IAuthResetPasswordByMobilePayload, IOtp } from '~/interfaces'
import { OtpReferenceTypeEnum, OtpTypeEnum } from '~/enums'
import { AuthDestroyUtil } from '~/utils/main'
import { AuthService } from '../../services'
import { AxiosError } from 'axios'

interface IForgotPasswordProps {
  step?: number
  reference?: string
  referenceType?: OtpReferenceTypeEnum
}

const ForgotPassword: FC<IForgotPasswordProps> = (props: IForgotPasswordProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(props.step) // 0=FORGOT_PASSWORD_FORM, 1=FORGOT_PASSWORD_EMAIL_REQUEST, 2=FORGOT_PASSWORD_CONFIRM, 3=FORGOT_PASSWORD_SUCCESS
  const [reference, setReference] = useState<string>(props.reference)
  const [referenceType, setReferenceType] = useState<OtpReferenceTypeEnum>(props.referenceType)
  const [password, setPassword] = useState<string>('')

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: IAuthForgotPasswordForm): void {
    try {
      setReference(values.reference)
      if (
        RegExpConst.CHECK_EMAIL.test(values.reference) &&
        !values.reference.match(RegExpConst.MATCH_THAI_LETTER)
      ) {
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
    try {
      setIsLoading(true)

      const payload: IAuthResetPasswordByMobilePayload = {
        mobile: reference,
        password,
        otpCode: values.otpCode,
        refCode: values.refCode
      }

      await AuthService.resetPasswordByMobile(payload)

      toggle()
      AuthDestroyUtil()
      message.success(t('common:apiMessage.success'))
      setStep(3)
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          case 102001:
            message.error(t('message:buyer.auth.forgotPassword.invalidOtp'))
            break
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  function onSubmitNewPassword(values: { password: string }): void {
    if (referenceType === OtpReferenceTypeEnum.MOBILE) {
      toggle()
    }
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
            referenceType={referenceType}
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

ForgotPassword.defaultProps = {
  step: 0,
  reference: '',
  referenceType: null
}

export default ForgotPassword
