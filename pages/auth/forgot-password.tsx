import React, { FC } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ForgotPassword from '~/modules/ForgotPassword'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.forgot-password'
      ]))
    }
  }
}

const ForgotPasswordPage: FC = () => <ForgotPassword />

export default ForgotPasswordPage
