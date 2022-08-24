import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import HappyPointTransfer from '~/modules/HappyPoint/components/HappyPointTransfer'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'happy-point']))
    }
  }
}

const HappyPointTransferPage: FC = () => <HappyPointTransfer />

export default HappyPointTransferPage
