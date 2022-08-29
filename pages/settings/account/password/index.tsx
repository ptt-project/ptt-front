import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import ChangePassword from '~/modules/ChangePassword'

export async function getStaticProps(context: NextPageContext): Promise<any> {
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
