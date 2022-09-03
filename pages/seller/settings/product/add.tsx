import React, { FC } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerAddProduct from '~/modules/SellerProduct/components/ProductForm'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'seller.product']))
    }
  }
}
const SellerAddProductPage: FC = () => <SellerAddProduct />

export default SellerAddProductPage
