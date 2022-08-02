import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import RegisterSellerForm from './components/RegisterSellerForm'
import RegisterSellerSuccess from './components/RegisterSellerSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'

const RegisterSeller: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register-seller'])
  const [step, setStep] = useState<number>(0) // 0=REGISTER_SELLER_FORM, 1=REGISTER_SELLER_SUCCESS

  function renderStep(): JSX.Element {
    switch (step) {
      case 0: // REGISTER_SELLER_FORM
        return <RegisterSellerForm setStep={setStep} />
      case 1: // REGISTER_SELLER_SUCCESS
        return <RegisterSellerSuccess />
      default:
        return <RegisterSellerForm setStep={setStep} />
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('auth.register-seller:title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[{ title: t('auth.register-seller:title') }]} />
      {renderStep()}
    </main>
  )
}

export default RegisterSeller
