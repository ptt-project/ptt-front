import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import HappyPointSell from '~/modules/HappyPoint/components/HappyPointSell'
import { withAuth } from '../../../../hocs/with-user'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'happy-point']))
    }
  })
)

const HappyPointSellPage: FC = () => <HappyPointSell />

export default HappyPointSellPage
