import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import RegisterSeller from '~/modules/RegisterSeller'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.register-seller'
      ]))
    }
  }
}

const RegisterSellerPage: FC = () => <RegisterSeller />

export default RegisterSellerPage
