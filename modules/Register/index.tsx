import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import RegisterForm from './components/RegisterForm'
import RegisterConsent from './components/RegisterConsent'
import RegisterSuccess from './components/RegisterSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { IRegisterForm } from '~/model/Auth'
import { LocaleNamespaceConst } from '~/constants'

const Register: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register'])
  const [form, setForm] = useState<IRegisterForm>({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    username: '',
    password: ''
  })
  const [step, setStep] = useState<number>(0) // 0=REGISTER_FORM, 1=REGISTER_CONSENT, 2=REGISTER_SUCCESS

  function renderStep(): JSX.Element {
    switch (step) {
      case 0: // REGISTER_FORM
        return <RegisterForm setForm={setForm} setStep={setStep} />
      case 1: // REGISTER_CONSENT
        return <RegisterConsent form={form} setStep={setStep} />
      case 2: // REGISTER_SUCCESS
        return <RegisterSuccess />
      default:
        return <RegisterForm setForm={setForm} setStep={setStep} />
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('auth.register:title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('auth.register:title') }]} />
      {renderStep()}
    </main>
  )
}

export default Register
