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
import {
  IAuthForgotPasswordForm,
  IAuthResetPasswordByEmailPayload,
  IAuthResetPasswordByMobilePayload,
  IOtp
} from '~/interfaces'
import { OtpReferenceTypeEnum, OtpTypeEnum } from '~/enums'
import { AuthDestroyUtil } from '~/utils/main'
import { AuthService } from '../../services'
import { AxiosError } from 'axios'

interface IForgotPasswordProps {
  query?: {
    email: string
    code: string
  }
}

const ForgotPassword: FC<IForgotPasswordProps> = (props: IForgotPasswordProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.forgot-password', 'auth.login'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [step, setStep] = useState<number>(getDefaultStep()) // 0=FORGOT_PASSWORD_FORM, 1=FORGOT_PASSWORD_EMAIL_REQUEST, 2=FORGOT_PASSWORD_CONFIRM, 3=FORGOT_PASSWORD_SUCCESS
  const [reference, setReference] = useState<string>(getDefaultReference())
  const [referenceType, setReferenceType] = useState<OtpReferenceTypeEnum | undefined>(
    getDefaultReferenceType()
  )
  const [password, setPassword] = useState<string>('')

  function getDefaultStep(): number {
    if (props.query) {
      return 2
    }

    return 0
  }

  function getDefaultReference(): string | undefined {
    if (props.query) {
      return props.query.email
    }

    return undefined
  }

  function getDefaultReferenceType(): OtpReferenceTypeEnum | undefined {
    if (props.query) {
      return OtpReferenceTypeEnum.EMAIL
    }

    return undefined
  }

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onSubmit(values: IAuthForgotPasswordForm): void {
    setReference(values.reference)

    if (
      RegExpConst.CHECK_EMAIL.test(values.reference) &&
      !values.reference.match(RegExpConst.MATCH_THAI_LETTER)
    ) {
      setReferenceType(OtpReferenceTypeEnum.EMAIL)
      onRequestResetEmail(values.reference)
    } else if (values.reference.replace(RegExpConst.ALLOW_NUMBER, '').length === 10) {
      setReferenceType(OtpReferenceTypeEnum.MOBILE)
      setStep(2)
    }
  }

  async function onRequestResetEmail(email: string): Promise<void> {
    try {
      setIsLoading(true)

      await AuthService.requestResetPasswordByEmail(email)

      message.success(t('common:apiMessage.success'))
      setStep(1)
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          case 101004:
            message.error(t('message:buyer.auth.forgotPassword.invalidEmail'))
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

  async function onSubmitEmail(values: { password: string }): Promise<void> {
    try {
      setIsLoading(true)

      const payload: IAuthResetPasswordByEmailPayload = {
        email: reference,
        password: values.password,
        loginToken: props.query.code
      }

      await AuthService.resetPasswordByEmail(payload)

      AuthDestroyUtil()
      message.success(t('common:apiMessage.success'))
      setStep(3)
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
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
    setPassword(values.password)

    if (referenceType === OtpReferenceTypeEnum.MOBILE) {
      toggle()
    }

    if (referenceType === OtpReferenceTypeEnum.EMAIL) {
      onSubmitEmail(values)
    }
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
      <Breadcrumbs
        items={[
          { title: t('auth.login:title'), href: '/auth/login' },
          { title: t('auth.forgot-password:title') }
        ]}
      />
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
