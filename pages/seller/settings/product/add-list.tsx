import React, { FC } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerMyProductsForm from '~/modules/SellerMyProducts/components/SellerMyProductsForm'
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
const SellerMyProductsAddPage: FC = () => <SellerMyProductsForm />

export default SellerMyProductsAddPage
