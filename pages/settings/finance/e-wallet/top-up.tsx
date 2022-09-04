import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EWalletTopUp from '~/modules/EWallet/EWalletTopUp'
import { withAuth } from '~/utils/main'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'e-wallet']))
    }
  })
)

const EWalletTopUpPage: FC = () => <EWalletTopUp />

export default EWalletTopUpPage
