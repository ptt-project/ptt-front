import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FlashSale from '~/modules/SellerMarketing/components/FlashSale'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.marketing'
      ]))
    }
  }
}
const FlashSalePage: FC = () => <FlashSale />

export default FlashSalePage
