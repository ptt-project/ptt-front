import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerMyProducts from '~/modules/SellerMyProducts'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'seller.product']))
    }
  }
}
const SellerMyProductsPage: FC = () => <SellerMyProducts />

export default SellerMyProductsPage
