import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import Product from '../../modules/Product'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'search',
        'product'
      ]))
    }
  }
}

const ProductPage: FC = () => <Product />

export default ProductPage
