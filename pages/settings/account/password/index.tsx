import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import ChangePassword from '~/modules/ChangePassword'

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<any>> {
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
