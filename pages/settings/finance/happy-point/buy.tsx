import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import HappyPointBuy from '~/modules/HappyPoint/components/HappyPointBuy'
import { withAuth } from '~/utils/main'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'happy-point']))
    }
  })
)

const HappyPointBuyPage: FC = () => <HappyPointBuy />

export default HappyPointBuyPage
