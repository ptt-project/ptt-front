import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EWalletWithdraw from '~/modules/EWallet/EWalletWithdraw'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'e-wallet']))
    }
  }
}

const EWalletWithdrawPage: FC = () => <EWalletWithdraw />

export default EWalletWithdrawPage
