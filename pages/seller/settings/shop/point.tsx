import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerPoint from '~/modules/SellerPoint'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'seller.point']))
    }
  }
}
const PointPage: FC = () => <SellerPoint />

export default PointPage
