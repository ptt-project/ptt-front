import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import HappyPointSell from '~/modules/HappyPoint/components/HappyPointSell'
import { AuthCheckAuthenticate } from '~/utils/main'

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<any>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'happy-point']))
    }
  }
}

const HappyPointSellPage: FC = () => <HappyPointSell />

export default HappyPointSellPage
