import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerMarketing from '~/modules/SellerMarketing'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.marketing'
        ]))
      }
    }
  }
)

const MarketingPage: FC = () => <SellerMarketing />

export default MarketingPage
