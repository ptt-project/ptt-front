import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AddPhone from '~/modules/Profile/components/Phone/AddPhone'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account.info']))
    }
  }
}
const AddPhonePage: FC = () => <AddPhone />

export default AddPhonePage
