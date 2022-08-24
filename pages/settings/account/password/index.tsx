import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import ChangePassword from '~/modules/ChangePassword'
import { AuthCheckAuthenticate } from '~/utils/main'

export async function getStaticProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<any>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.register',
        'change-password'
      ]))
    }
  }
}

const ChangePasswordPage: FC = () => <ChangePassword />

export default ChangePasswordPage
