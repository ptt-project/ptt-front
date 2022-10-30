import React, { FC } from 'react'
import SellerProductForm from '~/modules/SellerProduct/components/ProductForm'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.product'
        ]))
      }
    }
  }
)

const SellerAddProductPage: FC = () => <SellerProductForm />

export default SellerAddProductPage
