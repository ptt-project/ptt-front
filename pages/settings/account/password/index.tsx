import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import ChangePassword from '~/modules/ChangePassword'
import { withAuth } from '~/utils/main'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.register',
        'change-password'
      ]))
    }
  })
)

const ChangePasswordPage: FC = () => <ChangePassword />

export default ChangePasswordPage
