import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Phone from '~/modules/Profile/components/Phone'
import { LocaleNamespaceConst } from '~/constants'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info']))
    }
  }
}
const PhonePage: FC = () => <Phone />

export default PhonePage
