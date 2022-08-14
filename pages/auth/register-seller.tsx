import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmpty } from 'lodash'
import RegisterSeller from '~/modules/RegisterSeller'
import { LocaleNamespaceConst } from '~/constants'
import { AuthCheckAuthenticate } from '~/utils/main'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  const authenticate: boolean = AuthCheckAuthenticate(context)
  if (!isEmpty(authenticate)) {
    return authenticate
  }

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
