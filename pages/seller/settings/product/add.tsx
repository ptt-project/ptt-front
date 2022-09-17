import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerAddProduct from '~/modules/SellerProduct/components/ProductForm'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => ({
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'seller.product']))
    }
  })
)

const SellerAddProductPage: FC = () => <SellerAddProduct />

export default SellerAddProductPage
