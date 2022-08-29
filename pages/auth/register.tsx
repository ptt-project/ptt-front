import React, { FC } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Register from '~/modules/Register'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'auth.register']))
    }
  }
}

const RegisterPage: FC = () => <Register />

export default RegisterPage
