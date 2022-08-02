import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerCategory from '~/modules/SellerCategory'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.category'
      ]))
    }
  }
}

const SellerCategoryPage: FC = () => <SellerCategory />

export default SellerCategoryPage
