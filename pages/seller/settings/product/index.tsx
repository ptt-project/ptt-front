import React, { FC } from 'react'
import SellerProduct from '~/modules/SellerProduct'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    const { req } = context

    if (req) {
      try {
        console.log('waiting for api product list')
      } catch (error) {
        console.log(error)

        return {
          redirect: {
            destination: '/error',
            permanent: true
          }
        }
      }
    }

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

const SellerProductPage: FC = () => <SellerProduct />

export default SellerProductPage
