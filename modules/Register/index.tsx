import React, { useState, FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import NextLink from 'next/link'
import Helmet from 'react-helmet'
import { Typography } from 'antd'
import RegisterForm from './components/RegisterForm'
import RegisterConsent from './components/RegisterConsent'
import RegisterSuccess from './components/RegisterSuccess'
import t from '~/locales'

const { Link } = Typography
interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

const Register: FC = () => {
  const router: NextRouter = useRouter()
  const [form, setForm] = useState<IFormModel>({
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
          {t('meta.title')} | {t('auth.register.title')}
        </title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <NextLink href="/" locale={router.locale}>
                <Link>
                  <i className="d-icon-home" />
                </Link>
              </NextLink>
            </li>
            <li>{t('auth.register.title')}</li>
          </ul>
        </div>
      </nav>
      {renderStep()}
    </main>
  )
}

export default Register
