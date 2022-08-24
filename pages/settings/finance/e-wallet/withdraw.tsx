import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EWalletWithdraw from '~/modules/EWallet/EWalletWithdraw'
import { AuthCheckAuthenticate } from '~/utils/main'

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<any>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'e-wallet']))
    }
  }
}

const EWalletWithdrawPage: FC = () => <EWalletWithdraw />

export default EWalletWithdrawPage
