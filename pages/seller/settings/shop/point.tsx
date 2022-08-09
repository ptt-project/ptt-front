import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerPoint from '~/modules/SellerPoint'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'seller.point']))
    }
  }
}
const PointPage: FC = () => <SellerPoint />

export default PointPage
