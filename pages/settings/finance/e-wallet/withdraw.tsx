import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EWalletWithdraw from '~/modules/EWallet/EWalletWithdraw'
import { withAuth } from '../../../../hocs/with-user'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'e-wallet']))
    }
  })
)

const EWalletWithdrawPage: FC = () => <EWalletWithdraw />

export default EWalletWithdrawPage
