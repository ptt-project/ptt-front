import React, { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import RegisterSellerForm from './components/RegisterSellerForm'
import RegisterSellerSuccess from './components/RegisterSellerSuccess'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import { ISellerInfoRes } from '~/interfaces'

interface IRegisterSellerProps {
  shopInfo?: ISellerInfoRes
}

const RegisterSeller: FC<IRegisterSellerProps> = (props: IRegisterSellerProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'auth.register-seller'])
  const [step, setStep] = useState<number>(0) // 0=REGISTER_SELLER_FORM, 1=REGISTER_SELLER_SUCCESS

  function renderStep(): JSX.Element {
    switch (step) {
      case 0: // REGISTER_SELLER_FORM
        return <RegisterSellerForm setStep={setStep} shopInfo={props.shopInfo} />
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

RegisterSeller.defaultProps = {
  shopInfo: null
}

export default RegisterSeller
