import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import HappyPointTransfer from '~/modules/HappyPoint/components/HappyPointTransfer'
import { withAuth } from '../../../../hocs/with-user'

export const getServerSideProps: any = withAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'happy-point']))
    }
  })
)

const HappyPointTransferPage: FC = () => <HappyPointTransfer />

export default HappyPointTransferPage
