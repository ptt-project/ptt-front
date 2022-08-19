import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerMarketing from '~/modules/SellerMarketing'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.marketing'
      ]))
    }
  }
}
const MarketingPage: FC = () => <SellerMarketing />

export default MarketingPage
