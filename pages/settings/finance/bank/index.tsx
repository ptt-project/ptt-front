import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import BankAccount from '~/modules/BankAccount'
import { withAuth } from '../../../../hocs/with-user'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const queryClient: QueryClient = new QueryClient()

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'bank-account'
        ])),
        dehydratedState: dehydrate(queryClient)
      }
    }
  }
)

const BankAccountPage: FC = () => <BankAccount />

export default BankAccountPage
