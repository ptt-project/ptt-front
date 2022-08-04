import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerMyProductsForm from '~/modules/SellerMyProducts/components/SellerMyProductsForm'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst]))
    }
  }
}
const SellerMyProductsAddPage: FC = () => <SellerMyProductsForm />

export default SellerMyProductsAddPage
