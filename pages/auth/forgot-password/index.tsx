import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ForgotPassword from '~/modules/ForgotPassword'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.forgot-password',
        'auth.login'
      ]))
    }
  }
}

const ForgotPasswordPage: FC = () => <ForgotPassword />

export default ForgotPasswordPage
