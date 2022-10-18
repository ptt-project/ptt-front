import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerShopDetail from '~/modules/SellerShopDetail'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.shop-detail'
        ]))
      }
    }
  }
)

const DetailPage: FC = () => <SellerShopDetail />

export default DetailPage
