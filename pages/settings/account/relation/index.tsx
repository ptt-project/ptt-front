import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { LocaleNamespaceConst } from '~/constants'
import Relation from '~/modules/Relation'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'relation']))
    }
  }
}

const RelationPage: React.FC = () => <Relation />

export default RelationPage
