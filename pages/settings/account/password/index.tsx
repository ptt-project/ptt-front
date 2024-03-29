import React, { FC } from 'react'
import ChangePassword from '~/modules/ChangePassword'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withAuth } from '../../../../hocs/with-user'

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
