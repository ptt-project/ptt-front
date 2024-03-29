import React, { FC } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Login from '~/modules/Login'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'auth.login']))
    }
  }
}

const LoginPage: FC = () => <Login />

export default LoginPage
